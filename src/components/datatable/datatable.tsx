import Image from 'next/image';
import { ChangeEvent, FormEventHandler, useState } from 'react';

export default function DataTable() {
  const [showPopup, setShowPopup] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: '12809',
      product: 'Apple Macbook Pro...',
      time: '20/03/2023,01:10',
      status: 'Waiting Payment',
      qty: 'x1',
      price: '$4.012',
      customer: 'Omar Griffith'
    }
    // Initial table data...
  ]);
  const [formData, setFormData] = useState({
    id: '',
    product: '',
    time: '',
    status: '',
    qty: '',
    price: '',
    customer: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleTogglePopup = () => setShowPopup(!showPopup);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    if (isEditing && editIndex !== null) {
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTableData([...tableData, formData]);
    }
    setShowPopup(false);
    setFormData({
      id: '',
      product: '',
      time: '',
      status: '',
      qty: '',
      price: '',
      customer: ''
    });
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setFormData(tableData[index]);
    setIsEditing(true);
    setShowPopup(true);
  };

  const handleDelete = (index: number) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleTogglePopup}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors sm:p-3 sm:text-sm md:p-2 lg:text-base"
        >
          {isEditing ? 'Edit Item' : 'Add Item'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse w-full">
          <thead className="bg-[#222E3A]/[6%] text-xs font-semibold sm:text-sm text-left">
            <tr>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Order ID</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36] hidden sm:table-cell">Product</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36] hidden md:table-cell">Order Time</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Status</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Qty</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Total Price</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Customer</th>
              <th className="whitespace-nowrap py-2 px-4 text-[#212B36]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="cursor-pointer bg-[#f6f8fa] hover:bg-[#e9ecef] transition-colors">
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381]">{row.id}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381] hidden sm:table-cell">{row.product}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381] hidden md:table-cell">{row.time}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#DD6107]">{row.status}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381]">{row.qty}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381]">{row.price}</td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381]">
                  <div className="flex items-center gap-2">
                    <Image src="" alt="Customer Avatar" width={22} height={22} className="rounded-full" />
                    {row.customer}
                  </div>
                </td>
                <td className="py-3 px-4 text-xs sm:text-sm text-[#637381] flex gap-2">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-xl md:max-w-md w-full sm:w-10/12 mx-auto">
            {/* Close button */}

            <div className="bg-slate-300 w-full p-3  rounded-t-lg mb-3">
              <h2 className="text-xl font-semibold ">{isEditing ? 'Create' : 'Add New Item'}</h2>

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-slate-950 focus:outline-none w-5 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Order ID"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Product"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Order Time"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Waiting Payment">Waiting Payment</option>
                  <option value="Transition Done">Transition Done</option>
                  <option value="Delivery to Cust">Delivery to Customer</option>
                  <option value="Cancel">Cancel</option>
                </select>
                <input
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <input
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  placeholder="Customer Name"
                  className="w-full p-2 border rounded-lg"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors sm:text-sm lg:px-6 lg:py-3 w-full"
                >
                  {isEditing ? 'Update Item' : 'Add Item'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
