import * as THREE from 'three';

/**
 * 3D Instancing utilities for rendering multiple objects with the same geometry
 * using InstancedMesh for massive performance improvements.
 */

export interface InstanceConfig {
  position: THREE.Vector3;
  rotation?: THREE.Euler;
  scale?: THREE.Vector3;
  color?: THREE.Color;
}

/**
 * Create an InstancedMesh with configured instances
 */
export const createInstancedMesh = (
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  instances: InstanceConfig[]
): THREE.InstancedMesh => {
  const count = instances.length;
  const mesh = new THREE.InstancedMesh(geometry, material, count);

  // Temporary objects for matrix calculations
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const rotation = new THREE.Euler();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(1, 1, 1);

  // Set up instance matrices
  instances.forEach((instance, i) => {
    position.copy(instance.position);

    if (instance.rotation) {
      rotation.copy(instance.rotation);
      quaternion.setFromEuler(rotation);
    } else {
      quaternion.set(0, 0, 0, 1);
    }

    if (instance.scale) {
      scale.copy(instance.scale);
    } else {
      scale.set(1, 1, 1);
    }

    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(i, matrix);

    // Set instance color if provided and material supports it
    if (instance.color && mesh.instanceColor) {
      mesh.setColorAt(i, instance.color);
    }
  });

  // Required after setting matrices/colors
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }

  return mesh;
};

/**
 * Update a single instance in an InstancedMesh
 */
export const updateInstance = (
  mesh: THREE.InstancedMesh,
  index: number,
  config: Partial<InstanceConfig>
): void => {
  const matrix = new THREE.Matrix4();
  mesh.getMatrixAt(index, matrix);

  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  matrix.decompose(position, quaternion, scale);

  if (config.position) {
    position.copy(config.position);
  }

  if (config.rotation) {
    quaternion.setFromEuler(config.rotation);
  }

  if (config.scale) {
    scale.copy(config.scale);
  }

  matrix.compose(position, quaternion, scale);
  mesh.setMatrixAt(index, matrix);
  mesh.instanceMatrix.needsUpdate = true;

  if (config.color && mesh.instanceColor) {
    mesh.setColorAt(index, config.color);
    mesh.instanceColor.needsUpdate = true;
  }
};

/**
 * Batch update multiple instances
 */
export const updateInstances = (
  mesh: THREE.InstancedMesh,
  updates: Array<{ index: number; config: Partial<InstanceConfig> }>
): void => {
  updates.forEach(({ index, config }) => {
    updateInstance(mesh, index, config);
  });
};

/**
 * Create colored instances for planets with different colors
 */
export const createColoredInstances = (
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  instances: InstanceConfig[]
): THREE.InstancedMesh => {
  const mesh = createInstancedMesh(geometry, material, instances);

  // Enable instance colors
  if (!mesh.instanceColor) {
    mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(instances.length * 3),
      3
    );
  }

  instances.forEach((instance, i) => {
    if (instance.color) {
      mesh.setColorAt(i, instance.color);
    }
  });

  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }

  return mesh;
};

/**
 * Helper to create planet instances configuration
 */
export const createPlanetInstances = (
  count: number,
  radius: number,
  colors: string[]
): InstanceConfig[] => {
  const instances: InstanceConfig[] = [];
  const angleStep = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    instances.push({
      position: new THREE.Vector3(x, 0, z),
      rotation: new THREE.Euler(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
      color: new THREE.Color(colors[i % colors.length]),
    });
  }

  return instances;
};

/**
 * Animation helper for rotating instances
 */
export const animateInstanceRotation = (
  mesh: THREE.InstancedMesh,
  index: number,
  delta: number,
  rotationSpeed: THREE.Vector3
): void => {
  const matrix = new THREE.Matrix4();
  mesh.getMatrixAt(index, matrix);

  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  matrix.decompose(position, quaternion, scale);

  const euler = new THREE.Euler().setFromQuaternion(quaternion);
  euler.x += rotationSpeed.x * delta;
  euler.y += rotationSpeed.y * delta;
  euler.z += rotationSpeed.z * delta;

  quaternion.setFromEuler(euler);
  matrix.compose(position, quaternion, scale);
  mesh.setMatrixAt(index, matrix);
  mesh.instanceMatrix.needsUpdate = true;
};
