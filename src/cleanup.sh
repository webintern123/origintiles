#!/bin/bash

# Origin Tiles - Documentation Cleanup Script
# Removes redundant documentation files
# Date: November 1, 2025

echo "🧹 Origin Tiles - Documentation Cleanup"
echo "========================================"
echo ""

# Count files before cleanup
echo "📊 Current status:"
echo "Root markdown files: $(ls -1 *.md 2>/dev/null | wc -l)"
echo ""

# Ask for confirmation
read -p "Remove 9 redundant documentation files? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "🗑️  Removing redundant files..."
    echo ""
    
    # Remove redundant documentation
    rm -f ALL_ERRORS_FIXED_SUMMARY.md && echo "✅ Removed: ALL_ERRORS_FIXED_SUMMARY.md"
    rm -f ALL_FILES_COMPLETE.md && echo "✅ Removed: ALL_FILES_COMPLETE.md"
    rm -f MISSING_FILES_CHECK.md && echo "✅ Removed: MISSING_FILES_CHECK.md"
    rm -f QUICK_FIX_GUIDE.md && echo "✅ Removed: QUICK_FIX_GUIDE.md"
    rm -f DEVELOPER_ERROR_FIXES.md && echo "✅ Removed: DEVELOPER_ERROR_FIXES.md"
    rm -f FOR_DEVELOPER_READ_THIS.md && echo "✅ Removed: FOR_DEVELOPER_READ_THIS.md"
    rm -f GIVE_DEVELOPER_THIS.md && echo "✅ Removed: GIVE_DEVELOPER_THIS.md"
    rm -f CLEANUP_SUMMARY.md && echo "✅ Removed: CLEANUP_SUMMARY.md"
    rm -f FINAL_VERIFICATION.md && echo "✅ Removed: FINAL_VERIFICATION.md"
    
    echo ""
    echo "📁 Moving analysis file..."
    
    # Move analysis to correct folder
    if [ -f "COMPREHENSIVE_SITE_ANALYSIS_AND_FEEDBACK.md" ]; then
        mv COMPREHENSIVE_SITE_ANALYSIS_AND_FEEDBACK.md docs/reviews/COMPREHENSIVE_SITE_ANALYSIS.md
        echo "✅ Moved: COMPREHENSIVE_SITE_ANALYSIS_AND_FEEDBACK.md → docs/reviews/"
    fi
    
    echo ""
    echo "📊 After cleanup:"
    echo "Root markdown files: $(ls -1 *.md 2>/dev/null | wc -l)"
    echo ""
    echo "✨ Cleanup complete!"
    echo ""
    echo "📚 Essential documentation remaining:"
    ls -1 *.md 2>/dev/null
    echo ""
    echo "🎉 Your project is now cleaner and more organized!"
    echo ""
    
    # Ask to remove cleanup files
    read -p "Remove cleanup files (cleanup.sh, UNWANTED_CONTENT_CLEANUP.md)? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        rm -f UNWANTED_CONTENT_CLEANUP.md && echo "✅ Removed: UNWANTED_CONTENT_CLEANUP.md"
        rm -f cleanup.sh && echo "✅ Removed: cleanup.sh"
        echo ""
        echo "🎊 All cleanup files removed!"
    else
        echo ""
        echo "ℹ️  Cleanup files kept. You can delete them manually later."
    fi
else
    echo ""
    echo "❌ Cleanup cancelled. No files were removed."
fi

echo ""
echo "Done! 🎉"
