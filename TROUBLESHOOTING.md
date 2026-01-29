# Troubleshooting Guide

## Common Issues & Solutions

### 1. "Cannot find module './403.js'" Error

**Cause:** Stale build cache in `.next` directory

**Solution:**
```bash
rm -rf .next
npm run build
```

### 2. Port Already in Use

**Cause:** Dev server already running or port 3000 is occupied

**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### 3. Hydration Mismatch Warnings

**Cause:** Server/client HTML mismatch due to dynamic content or browser extensions

**Solution:** Already handled with `suppressHydrationWarning` in `layout.tsx`

### 4. Module Not Found Errors

**Cause:** Missing dependencies or corrupted node_modules

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### 5. Build Fails with Type Errors

**Solution:**
```bash
# Check types
npm run type-check

# If issues persist, clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### 6. @next/swc Version Mismatch Warning

**Cause:** System-wide Next.js installation conflicts with local version

**Note:** This is a non-critical warning and doesn't affect functionality

**To silence (optional):**
```bash
npm rebuild @next/swc
```

### 7. Multiple Lockfiles Warning

**Cause:** Both npm and other package managers (bun, yarn) lockfiles detected

**Note:** Non-critical, but you can remove unused lockfiles

**Solution:**
```bash
# If using npm only, remove other lockfiles
rm bun.lock yarn.lock pnpm-lock.yaml
```

## Clean Slate

If you encounter persistent issues, perform a complete clean:

```bash
# Remove all build artifacts and dependencies
rm -rf .next node_modules package-lock.json

# Reinstall and rebuild
npm install
npm run build

# Test
npm run dev
```

## Getting Help

1. Check the error message carefully
2. Search for the error in [Next.js discussions](https://github.com/vercel/next.js/discussions)
3. Clear browser cache and hard reload (Ctrl+Shift+R)
4. Check if browser extensions are interfering
5. Try incognito/private mode

## Performance Issues

### Slow Build Times
- Check if you're running other resource-intensive applications
- Ensure you have sufficient RAM (Next.js builds can be memory-intensive)
- Consider using `npm run dev` instead of rebuilding frequently

### Slow Dev Server
- Disable unused browser extensions
- Clear `.next/cache` directory
- Check for file watchers limit on Linux:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```

## Still Having Issues?

1. Check Node.js version: `node --version` (should be 18+)
2. Check npm version: `npm --version` (should be 9+)
3. Review `IMPLEMENTATION.md` for setup details
4. Open an issue with:
   - Full error message
   - Steps to reproduce
   - Your environment (OS, Node version, npm version)
