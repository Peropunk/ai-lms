import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

const mockStoreData = {
  categories: ['All', 'Books', 'Stationery', 'Uniforms', 'Food'],
  items: [
    { id: 1, name: 'Mathematics Textbook', category: 'Books', price: 45.99, image: '📚', stock: 15 },
    { id: 2, name: 'School Lunch', category: 'Food', price: 12.50, image: '🍱', stock: 50 },
    { id: 3, name: 'Notebook Set', category: 'Stationery', price: 8.99, image: '📓', stock: 25 },
    { id: 4, name: 'School T-Shirt', category: 'Uniforms', price: 25.00, image: '👕', stock: 10 }
  ]
};

export default function StudentStore() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);

  const filteredItems = selectedCategory === 'All' 
    ? mockStoreData.items 
    : mockStoreData.items.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">School Store</h1>
            <p className="text-gray-600">Purchase books, stationery, and other school items</p>
          </div>
          
          <div className="flex gap-2">
            {mockStoreData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{item.image}</div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-purple-600">${item.price}</span>
                <span className="text-sm text-gray-500">{item.stock} in stock</span>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-green-800">
              {cart.length} item(s) added to cart. 
              <button className="ml-2 text-green-600 underline">View Cart</button>
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
