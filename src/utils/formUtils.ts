
// Common form utility functions

/**
 * Save form data to session storage
 */
export const saveFormData = (data: Record<string, any>) => {
  const existingData = getFormData();
  sessionStorage.setItem('admissionForm', JSON.stringify({
    ...existingData,
    ...data
  }));
};

/**
 * Get form data from session storage
 */
export const getFormData = (): Record<string, any> => {
  const data = sessionStorage.getItem('admissionForm');
  return data ? JSON.parse(data) : {};
};

/**
 * Clear form data from session storage
 */
export const clearFormData = () => {
  sessionStorage.removeItem('admissionForm');
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number (10 digits)
 */
export const isValidPhone = (phone: string): boolean => {
  const re = /^\d{10}$/;
  return re.test(phone.replace(/[^0-9]/g, ''));
};

/**
 * Validate form fields
 */
export const validateForm = (formData: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Required fields validation
  const requiredFields = [
    'fullName', 'middleName', 'lastName', 'gender', 'dob', 
    'pob', 'address', 'phone', 'email', 'fatherName', 'motherName', 'chooseBCA'
  ];
  
  requiredFields.forEach(field => {
    if (!formData[field]) {
      errors[field] = 'This field is required';
    }
  });

  // Email validation
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }

  return errors;
};
