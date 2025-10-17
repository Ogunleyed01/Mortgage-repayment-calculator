# 🏠 Mortgage Repayment Calculator

A beautiful, responsive mortgage calculator built with React and Tailwind CSS. This project is a solution to the [Frontend Mentor Mortgage Calculator Challenge](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-4nH1kOc8X).

## ✨ Features

### 🎯 Core Functionality
- **Real-time Mortgage Calculations**: Calculate monthly payments for both standard repayment and interest-only mortgages
- **Comprehensive Form Validation**: Real-time validation with helpful error messages
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Accessibility**: Full keyboard navigation, screen reader support, and ARIA attributes
- **Interactive UI**: Loading states, hover effects, and smooth transitions

### 🧮 Calculation Types
- **Standard Repayment**: Uses the standard mortgage formula `M = P[r(1+r)^n / ((1+r)^n)-1]`
- **Interest-Only**: Calculates interest-only payments for specified terms
- **Detailed Results**: Shows monthly payment, total interest, and total amount

### 📱 Responsive Breakpoints
- **Mobile**: `< 640px` - Stacked layout with optimized touch targets
- **Small**: `640px+` - Enhanced spacing and typography
- **Medium**: `768px+` - Improved form layout and padding
- **Large**: `1024px+` - Side-by-side layout with centered card design
- **Extra Large**: `1280px+` - Maximum width container with optimal spacing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mortgage-repayment-calculator.git
   cd mortgage-repayment-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 19.1.1** - Modern React with hooks
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting

## 📋 Form Validation

The calculator includes comprehensive validation for all inputs:

### Mortgage Amount
- **Required**: Must be provided
- **Minimum**: $1,000
- **Type**: Number with $1,000 step increments

### Mortgage Term
- **Required**: Must be provided
- **Range**: 1-50 years
- **Type**: Whole numbers only

### Interest Rate
- **Required**: Must be provided
- **Range**: 0-30% annually
- **Type**: Decimal numbers with 0.01 step increments

### Mortgage Type
- **Options**: Repayment or Interest-Only
- **Default**: Repayment selected

## 🎨 Design Features

### Visual Elements
- **Glass-morphism Effects**: Modern translucent cards in results section
- **Color-coded Results**: Different colors for monthly payment, total interest, and total amount
- **Smooth Animations**: Loading spinners and hover effects
- **Responsive Typography**: Scales appropriately across all screen sizes

### Accessibility
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators
- **Error Announcements**: Validation errors announced to screen readers
- **High Contrast**: Meets WCAG accessibility guidelines

## 🧮 Calculation Formulas

### Standard Repayment Mortgage
```
M = P[r(1+r)^n / ((1+r)^n)-1]
```
Where:
- `M` = Monthly payment
- `P` = Principal loan amount
- `r` = Monthly interest rate (annual rate ÷ 12)
- `n` = Total number of payments (years × 12)

### Interest-Only Mortgage
```
Monthly Payment = Principal × Monthly Interest Rate
```
Where:
- Monthly Interest Rate = Annual Rate ÷ 12

## 📱 Responsive Design

The application uses a mobile-first approach with the following breakpoints:

```css
/* Custom breakpoints */
--breakpoint-xs: 480px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Layout Changes
- **Mobile (< 1024px)**: Stacked layout with form above results
- **Desktop (≥ 1024px)**: Side-by-side layout with centered card design
- **Large screens**: Maximum width container with centered alignment

## 🎯 Usage Examples

### Example 1: Standard Repayment
- **Amount**: $300,000
- **Term**: 30 years
- **Rate**: 4.5%
- **Result**: $1,520.06/month

### Example 2: Interest-Only
- **Amount**: $500,000
- **Term**: 5 years
- **Rate**: 3.2%
- **Result**: $1,333.33/month

## 🧪 Testing

The application has been tested for:
- ✅ Form validation across all input types
- ✅ Calculation accuracy for both mortgage types
- ✅ Responsive design on various screen sizes
- ✅ Accessibility compliance
- ✅ Cross-browser compatibility
- ✅ Error handling and edge cases

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── index.css            # Global styles and Tailwind configuration
├── main.jsx             # Application entry point
├── assets/
│   ├── fonts/           # Plus Jakarta Sans font files
│   └── images/          # SVG icons and illustrations
└── design/              # Frontend Mentor design files
```

## 🎨 Customization

### Colors
The application uses a carefully selected color palette:
- **Primary**: Sky blue (#0ea5e9) for accents and focus states
- **Secondary**: Amber (#fbbf24) for the calculate button
- **Success**: Green (#065f46) for the results background
- **Error**: Red (#dc2626) for validation errors

### Typography
- **Font Family**: Plus Jakarta Sans (variable font)
- **Responsive Scaling**: Text sizes adjust across breakpoints
- **Weight Variations**: Regular (400), Medium (500), Bold (700)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/) for the design challenge
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the component-based architecture
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for the beautiful typography

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact the developer
- Check the Frontend Mentor community for similar solutions

---

**Built with ❤️ using React and Tailwind CSS**
