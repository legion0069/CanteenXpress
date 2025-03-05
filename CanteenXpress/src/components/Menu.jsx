import React, { useState } from 'react';

const categories = [
  'Juice Cafe',
  'Snacks Break',
  'Lunch Express',
  'Tea & Coffee Hub',
  'Beverages',
  'Waffle Factory'
];

const menuItems = [
  // Juice Cafe Items
  {
    id: 1,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice from Juice Cafe',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    category: 'Juice Cafe'
  },
  {
    id: 2,
    name: 'Mixed Berry Smoothie',
    description: 'Blend of fresh berries and yogurt from Juice Cafe',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80',
    category: 'Juice Cafe'
  },
  {
    id: 3,
    name: 'Green Detox',
    description: 'Healthy blend of spinach, apple, and celery from Juice Cafe',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80',
    category: 'Juice Cafe'
  },

  // Snacks Break Items
  {
    id: 4,
    name: 'French Fries',
    description: 'Crispy golden fries from Snacks Break',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80',
    category: 'Snacks Break'
  },
  {
    id: 5,
    name: 'Samosa',
    description: 'Crispy pastry with spiced potato filling from Snacks Break',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
    category: 'Snacks Break'
  },
  {
    id: 6,
    name: 'Cheese Sandwich',
    description: 'Classic cheese sandwich from Snacks Break',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&q=80',
    category: 'Snacks Break'
  },

  // Lunch Express Items
  {
    id: 7,
    name: 'Grilled Sandwich',
    description: 'Delicious Grilled Sandwich from Lunch Express',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80',
    category: 'Lunch Express'
  },
  {
    id: 8,
    name: 'Pasta Bowl',
    description: 'Delicious Pasta Bowl from Lunch Express',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80',
    category: 'Lunch Express'
  },
  {
    id: 9,
    name: 'Chicken Wrap',
    description: 'Delicious Chicken Wrap from Lunch Express',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80',
    category: 'Lunch Express'
  },
  {
    id: 10,
    name: 'Veggie Salad',
    description: 'Delicious Veggie Salad from Lunch Express',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
    category: 'Lunch Express'
  },

  // Tea & Coffee Hub Items
  {
    id: 11,
    name: 'Cappuccino',
    description: 'Classic Italian coffee from Tea & Coffee Hub',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80',
    category: 'Tea & Coffee Hub'
  },
  {
    id: 12,
    name: 'Green Tea',
    description: 'Premium Japanese green tea from Tea & Coffee Hub',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80',
    category: 'Tea & Coffee Hub'
  },
  {
    id: 13,
    name: 'Iced Latte',
    description: 'Refreshing iced coffee from Tea & Coffee Hub',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80',
    category: 'Tea & Coffee Hub'
  },

  // Beverages Items
  {
    id: 14,
    name: 'Cola',
    description: 'Chilled cola from Beverages',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80',
    category: 'Beverages'
  },
  {
    id: 15,
    name: 'Lemonade',
    description: 'Fresh homemade lemonade from Beverages',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80',
    category: 'Beverages'
  },
  {
    id: 16,
    name: 'Iced Tea',
    description: 'Refreshing iced tea from Beverages',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&q=80',
    category: 'Beverages'
  },

  // Waffle Factory Items
  {
    id: 17,
    name: 'Classic Waffle',
    description: 'Belgian style waffle with maple syrup from Waffle Factory',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&q=80',
    category: 'Waffle Factory'
  },
  {
    id: 18,
    name: 'Chocolate Waffle',
    description: 'Waffle with chocolate sauce and cream from Waffle Factory',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1630953899906-d16511a72558?auto=format&fit=crop&q=80',
    category: 'Waffle Factory'
  },
  {
    id: 19,
    name: 'Berry Waffle',
    description: 'Waffle topped with fresh berries from Waffle Factory',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1593786481097-cf281dd12e9e?auto=format&fit=crop&q=80',
    category: 'Waffle Factory'
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Juice Cafe');

  return (
    <section className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Sort By Store Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md">
            Sort By: Store
          </button>
        </div>

        {/* Categories Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap text-lg font-medium transition-colors
                ${selectedCategory === category 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-600 hover:text-orange-500'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems
            .filter(item => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 font-bold text-lg">${item.price}</span>
                    <div className="space-x-2">
                      <button className="bg-gray-900 text-white px-4 py-1 rounded">
                        Full
                      </button>
                      <button className="bg-emerald-500 text-white px-4 py-1 rounded">
                        Half
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;