
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { saveFormData, getFormData } from '../utils/formUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Building, MapPin } from 'lucide-react';

const Location = () => {
  const navigate = useNavigate();
  const formData = getFormData();
  
  // Redirect to the personal details page if no form data exists
  React.useEffect(() => {
    if (!formData.fullName) {
      navigate('/');
    }
  }, [formData, navigate]);

  const handleCampusSelection = (campus: string) => {
    // Save the selected campus
    saveFormData({ campus });
    // Navigate to the details page
    navigate('/details');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="page-title">Choose Your Campus</h1>
        
        <p className="text-center text-gray-600 mb-8">
          Select a campus location to continue your BCA admission process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card 
            className="campus-card hover:shadow-lg transition-shadow"
            onClick={() => handleCampusSelection('Siliguri')}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Siliguri</h2>
                <p className="text-gray-600 text-center">
                  Our Siliguri campus offers state-of-the-art facilities in a serene environment, 
                  perfect for focused learning and academic excellence.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>• Modern Computer Labs</p>
                  <p>• Digital Library</p>
                  <p>• Sports Facilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className="campus-card hover:shadow-lg transition-shadow"
            onClick={() => handleCampusSelection('Kolkata')}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Kolkata</h2>
                <p className="text-gray-600 text-center">
                  Located in the heart of the city, our Kolkata campus provides a dynamic 
                  learning environment with excellent industry connections.
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>• Advanced Technology Center</p>
                  <p>• Innovation Hub</p>
                  <p>• Internship Opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <p className="text-center text-gray-500 mt-8">
          Click on a campus to view detailed information about the BCA program.
        </p>
      </div>
    </div>
  );
};

export default Location;
