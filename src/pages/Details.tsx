
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFormData, clearFormData } from '../utils/formUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Details = () => {
  const navigate = useNavigate();
  const formData = getFormData();
  const campus = formData.campus;
  
  // Redirect to the personal details page if no form data exists
  useEffect(() => {
    if (!formData.fullName || !formData.campus) {
      navigate('/');
    }
  }, [formData, navigate]);

  // Define fee structure based on campus
  const getFeeStructure = () => {
    const baseTuition = campus === 'Siliguri' ? 20000 : 25000;
    const baseOtherFees = campus === 'Siliguri' ? 5000 : 7000;
    
    return Array.from({ length: 8 }, (_, i) => {
      const semester = i + 1;
      // Slightly increase fees for later semesters
      const tuitionFee = baseTuition + (semester > 4 ? 1000 : 0);
      const otherFees = baseOtherFees;
      const total = tuitionFee + otherFees;
      
      return { semester, tuitionFee, otherFees, total };
    });
  };

  const handleStartOver = () => {
    // Clear all form data and navigate to the first page
    clearFormData();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="page-title">BCA Department Overview – {campus}</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">About the Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              The Bachelor of Computer Applications (BCA) program at our {campus} campus is designed to provide 
              students with a strong foundation in computer science and applications. Our curriculum combines 
              theoretical knowledge with practical skills to prepare students for successful careers in the IT industry.
            </p>
            <p className="text-gray-700 mb-4">
              Our state-of-the-art facilities include modern computer labs, digital libraries, and innovation centers 
              where students can explore cutting-edge technologies under the guidance of experienced faculty members.
            </p>
            <p className="text-gray-700">
              The program duration is 3 years (6 semesters), with an option for an additional 1-year specialization 
              (2 semesters) in areas such as Data Science, Artificial Intelligence, or Cybersecurity.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Tuition Fee (₹)</TableHead>
                    <TableHead>Other Fees (₹)</TableHead>
                    <TableHead>Total (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFeeStructure().map((fee) => (
                    <TableRow key={fee.semester}>
                      <TableCell className="font-medium">{fee.semester}</TableCell>
                      <TableCell>{fee.tuitionFee.toLocaleString()}</TableCell>
                      <TableCell>{fee.otherFees.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{fee.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Other fees include library, laboratory, examination, and student welfare fees.
              <br />
              * One-time admission fee of ₹{campus === 'Siliguri' ? '5,000' : '8,000'} is payable at the time of admission (not included in the above table).
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary bg-opacity-5 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Industry Partnerships</h3>
                <p className="text-gray-600">
                  Collaborations with leading IT companies for internships and placements.
                </p>
              </div>
              
              <div className="p-4 bg-primary bg-opacity-5 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Specialized Labs</h3>
                <p className="text-gray-600">
                  Access to specialized labs for AI, networking, and software development.
                </p>
              </div>
              
              <div className="p-4 bg-primary bg-opacity-5 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Expert Faculty</h3>
                <p className="text-gray-600">
                  Learn from experienced faculty with industry and research backgrounds.
                </p>
              </div>
              
              <div className="p-4 bg-primary bg-opacity-5 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Career Support</h3>
                <p className="text-gray-600">
                  Dedicated placement cell to assist students with job opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate('/location')}
          >
            Back to Campus Selection
          </Button>
          
          <Button onClick={handleStartOver}>
            Start New Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
