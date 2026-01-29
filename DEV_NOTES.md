# Development Notes

## Automatic Cache Cleanup

To prevent the "Cannot find module './403.js'" error and similar build cache issues, this project automatically cleans the `.next` directory:

- **Before `npm run dev`**: Runs `predev` script to clean `.next`
- **Before `npm run build`**: Runs `prebuild` script to clean `.next`
- **Manual cleanup**: Run `npm run clean` to clear all cache

### Why This Is Necessary

Next.js caches compiled files in the `.next` directory. Sometimes this cache becomes corrupted, especially:
- When switching git branches
- After changing dependencies
- When build tools update
- When working with 3D libraries (R3F, Three.js)

The automatic cleanup ensures you always start with a fresh build cache, preventing mysterious errors.

### Performance Impact

- **First run**: Slower (full compilation needed)
- **Subsequent hot reloads**: Normal speed (Next.js fast refresh works fine)
- **Overall**: More reliable builds, fewer weird errors

### Manual Cleanup (if needed)

```bash
# Full clean
npm run clean

# Nuclear option (rebuilds everything)
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## Common Issues

### Port 3000 in Use
```bash
npx kill-port 3000
npm run dev
```

### Module Not Found Errors
The `predev` script should prevent these, but if they persist:
```bash
npm run clean
npm run dev
```

### Type Errors
```bash
npm run type-check
```

## Git Workflow

The `.next` directory is always gitignored to prevent:
- Committing build artifacts
- Merge conflicts in generated files
- Corrupted cache spreading across branches

Never commit the `.next` directory!
