# Contributing to Kascade

Thank you for your interest in contributing to Kascade! This document provides guidelines for contributing to the project.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/citron/Kascade.git
   cd Kascade
   ```

2. Install Thunderbird (if not already installed):
   - Download from https://www.thunderbird.net/

3. Load the extension in Thunderbird:
   - See [INSTALL.md](INSTALL.md) for detailed instructions

## Code Structure

```
Kascade/
├── manifest.json           # Extension configuration
├── background.js          # Event handlers and message search logic
├── sidebar/
│   ├── panel.html        # Sidebar UI structure
│   ├── panel.js          # Sidebar logic and event handling
│   └── panel.css         # Sidebar styling
└── icons/
    └── icon-64.png       # Extension icon
```

## Making Changes

### Before You Start

1. Check existing issues and pull requests to avoid duplicate work
2. For major changes, open an issue first to discuss what you'd like to change
3. Fork the repository and create a new branch for your changes

### Development Workflow

1. Make your changes in your branch
2. Test the changes thoroughly:
   - Load the modified extension in Thunderbird
   - Test all affected functionality
   - Check the developer console for errors
   - Verify the changes work across different scenarios

3. Ensure code quality:
   - Follow the existing code style
   - Add comments for complex logic
   - Keep functions focused and modular

4. Update documentation:
   - Update README.md if you add new features
   - Update INSTALL.md if installation steps change
   - Add inline code comments where appropriate

### Testing Checklist

Before submitting a pull request, verify:

- [ ] Extension loads without errors in Thunderbird
- [ ] All existing functionality still works
- [ ] New features work as expected
- [ ] Code follows the existing style
- [ ] No console errors or warnings
- [ ] Documentation is updated
- [ ] manifest.json version is updated (if applicable)

## Coding Guidelines

### JavaScript

- Use modern JavaScript (ES6+)
- Use `const` and `let` instead of `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Handle errors gracefully with try-catch
- Use async/await for asynchronous operations

### HTML/CSS

- Use semantic HTML5 elements
- Keep CSS organized and well-commented
- Use consistent naming conventions (kebab-case for classes)
- Ensure accessibility (proper ARIA labels, keyboard navigation)

### Thunderbird API Usage

- Follow Thunderbird WebExtension API best practices
- Use promises and async/await for API calls
- Handle API errors appropriately
- Test with different Thunderbird versions if possible

## Submitting Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

2. Push to your fork:
   ```bash
   git push origin your-branch-name
   ```

3. Open a Pull Request:
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes
   - List what you tested

## Bug Reports

When reporting bugs, please include:

- Thunderbird version
- Operating system
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Console errors (if any)

## Feature Requests

When requesting features:

- Describe the feature and its use case
- Explain why it would be valuable
- Consider how it fits with existing functionality
- Suggest possible implementation approaches

## Questions?

If you have questions about contributing:

- Open an issue with the "question" label
- Check existing documentation first
- Be specific about what you need help with

## License

By contributing to Kascade, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

- Be respectful and considerate
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain a positive and inclusive environment

Thank you for contributing to Kascade!
