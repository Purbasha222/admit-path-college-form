import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveFormData, validateForm } from '../utils/formUtils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    pob: '',
    address: '',
    phone: '',
    email: '',
    fatherName: '',
    motherName: '',
    chooseBCA: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
    
    // Clear error for gender when user selects
    if (errors.gender) {
      setErrors(prev => ({
        ...prev,
        gender: ''
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      chooseBCA: value
    }));
    
    // Clear error for chooseBCA when user selects
    if (errors.chooseBCA) {
      setErrors(prev => ({
        ...prev,
        chooseBCA: ''
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill all required fields correctly");
      return;
    }
    
    // Save form data
    saveFormData(formData);
    
    // If the user doesn't want to choose BCA, just show a thank you message
    if (formData.chooseBCA === 'no') {
      setIsSubmitted(true);
    } else {
      // If the user wants to choose BCA, navigate to the location selection page
      navigate('/location');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">
              Your application has been submitted successfully. We appreciate your interest in our college.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    dob: '',
                    pob: '',
                    address: '',
                    phone: '',
                    email: '',
                    fatherName: '',
                    motherName: '',
                    chooseBCA: ''
                  });
                }}
              >
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="page-title">College Admission Form</h1>
        
        <Card className="form-section mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                
                <div className="form-group">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <Label>Gender <span className="text-red-500">*</span></Label>
                <RadioGroup value={formData.gender} onValueChange={handleRadioChange} className="flex space-x-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? "border-red-500" : ""}
                  />
                  {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                </div>
                
                <div className="form-group">
                  <Label htmlFor="pob">Place of Birth <span className="text-red-500">*</span></Label>
                  <Input
                    id="pob"
                    name="pob"
                    value={formData.pob}
                    onChange={handleChange}
                    className={errors.pob ? "border-red-500" : ""}
                  />
                  {errors.pob && <p className="text-red-500 text-sm mt-1">{errors.pob}</p>}
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <Label htmlFor="phone">Contact Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="form-group">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <Label htmlFor="fatherName">Father's Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={errors.fatherName ? "border-red-500" : ""}
                  />
                  {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                </div>
                
                <div className="form-group">
                  <Label htmlFor="motherName">Mother's Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="motherName"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    className={errors.motherName ? "border-red-500" : ""}
                  />
                  {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
                </div>
              </div>
              
              <div className="form-group">
                <Label htmlFor="chooseBCA">Do you want to choose BCA? <span className="text-red-500">*</span></Label>
                <Select value={formData.chooseBCA} onValueChange={handleSelectChange}>
                  <SelectTrigger className={errors.chooseBCA ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.chooseBCA && <p className="text-red-500 text-sm mt-1">{errors.chooseBCA}</p>}
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" className="btn-primary">
                  {formData.chooseBCA === 'yes' ? 'Next' : 'Submit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
