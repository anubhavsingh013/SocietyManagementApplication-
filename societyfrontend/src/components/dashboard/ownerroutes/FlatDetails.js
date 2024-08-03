import React from 'react';

const FlatDetails = ({ owner }) => (
  <div className="container mx-auto p-6">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Flat Details</h2>
    <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100 ">
          {/* <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attribute</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr> */}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[
            { label: 'Flat No', value: owner.flatNo },
            { label: 'Owner Name', value: owner.name },
            { label: 'Owner Email', value: owner.email },
            { label: 'Phone Number', value: owner.phnNo }
          ].map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.label}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default FlatDetails;
