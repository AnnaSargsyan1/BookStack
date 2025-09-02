export function ShippingForm({ shipping, setShipping }) {
    const handleChange = (e) => {
      setShipping({ ...shipping, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={shipping.street}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shipping.city}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={shipping.zipCode}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>
      </div>
    );
  }
  