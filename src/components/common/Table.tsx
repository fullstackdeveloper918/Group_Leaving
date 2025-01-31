import React from 'react'

const Table = () => {
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Card</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Date Added</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Recipient</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">Signatures</th>
          <th className="py-2 px-4 text-left font-medium text-gray-600">View Card</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="py-3 px-4">
            <img src="https://groupleavingcards.com/images/gift/collection_pot.png"  className="w-20 h-20 object-cover rounded-lg mr-4" />
          </td>
          <td className="py-3 px-4">9/3/2024</td>
          <td className="py-3 px-4">Harry</td>
          <td className="py-3 px-4">1</td>
          <td className="py-3 px-4 text-blue-600 hover:underline cursor-pointer">0cVkV16gHzX</td>
        </tr>
        {/* Additional rows can be added here */}
      </tbody>
    </table>
  </div>
  )
}

export default Table