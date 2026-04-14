import Product from "./Product";

function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Welcome Card */}
      

      {/* Products Section */}
      <div className="w-full max-w-5xl">
        <Product />
      </div>
    </div>
  );
}
export default Dashboard;
