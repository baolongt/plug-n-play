#!/bin/bash

echo "🚀 Setting up GitHub Pages for Documentation"
echo "============================================"
echo ""

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
    echo "✅ gh-pages branch already exists"
    echo ""
    echo "To reset it (WARNING: This will delete all existing docs):"
    echo "  git push origin --delete gh-pages"
    echo "  Then run this script again"
else
    echo "Creating gh-pages branch..."
    
    # Save current branch
    current_branch=$(git branch --show-current)
    
    # Create orphan branch
    git checkout --orphan gh-pages
    
    # Remove all files
    git rm -rf . 2>/dev/null || true
    rm -rf *
    
    # Create initial content
    cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>@windoge98/plug-n-play Documentation</title>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 2rem; }
        h1 { color: #333; }
        .info { background: #f0f4f8; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
    </style>
</head>
<body>
    <h1>📚 @windoge98/plug-n-play Documentation</h1>
    <div class="info">
        <p>Documentation will be deployed here automatically when changes are pushed to the main branch.</p>
        <p>Pull request previews will appear in subdirectories (e.g., /pr-1/, /pr-2/).</p>
    </div>
</body>
</html>
EOF
    
    # Commit and push
    git add index.html
    git commit -m "Initialize gh-pages branch"
    git push -u origin gh-pages
    
    # Switch back to original branch
    git checkout $current_branch
    
    echo ""
    echo "✅ gh-pages branch created and pushed!"
fi

echo ""
echo "📋 Next steps:"
echo "1. Go to your repository Settings → Pages"
echo "2. Set Source to: Deploy from a branch"
echo "3. Set Branch to: gh-pages"
echo "4. Set Folder to: / (root)"
echo "5. Click Save"
echo ""
echo "Your documentation will be available at:"
echo "  https://[your-username].github.io/w98-pnp/"
echo ""
echo "PR previews will be available at:"
echo "  https://[your-username].github.io/w98-pnp/pr-[number]/"
echo ""
echo "✨ Setup complete!"