import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayouts'
import Home from './Pages/Home'
// import Footer from '../../carsClient/src/Components/Footer'
import Login from './Pages/Auth/Login'
import RequireAuth from './Components/Auth/RequireAuth'
import CarsList from './Pages/CarsPages/CarsList'
import CarDetail from './Pages/CarsPages/CarDetail'
import UsersList from './Pages/UserPages/UsersList'
import CarOrders from './Pages/CarsPages/CarOrders'
import CarBookDetails from './Pages/CarsPages/CarBookDetails'
import BoatList from './Pages/BoatPages/BoatList'
import BoatDetail from './Pages/BoatPages/BoatDetail'
import BoatOrders from './Pages/BoatPages/BoatOrders'
import BoatBookDetails from './Pages/BoatPages/BoatBookDetails'
import PriestList from './Pages/PriestPages/PriestList'
import PriestDetail from './Pages/PriestPages/PriestDetail'
import PriestOrders from './Pages/PriestPages/PriestOrders'
import PriestBookDetails from './Pages/PriestPages/PriestBookDetail'
import GuiderList from './Pages/GuiderPages/GuiderList'
import GuiderDetail from './Pages/GuiderPages/GuiderDetail'
import GuiderBookDetails from './Pages/GuiderPages/GuiderBookDetail'
import GuiderOrders from './Pages/GuiderPages/GuiderOrders'
import HotelsList from './Pages/HotelPages/HotelsList'
import HotelDetail from './Pages/HotelPages/HotelDetail'
import HotelOrders from './Pages/HotelPages/HotelOrders'
import HotelBookDetail from './Pages/HotelPages/HotelBookDetail'
import DeniedPage from './Pages/Auth/DeniedPage'
import PageNotFound from './Pages/Auth/404Page'
import Profile from './Pages/Auth/Profile'
import GlobalSettingsPage from './Pages/GlobalSettingsPage'
import WebsiteContent from './Pages/WebsiteContent/WebsiteContent'
import AboutContent from './Pages/WebsiteContent/AboutContent'
import ContactContent from './Pages/WebsiteContent/ContactContent'
import TestimonialWebsite from './Pages/WebsiteContent/TestimonialWebsite'
import DiscountManager from './Pages/DiscountPage'
import BookingDashboard from './Pages/BookingDashboard'
import OperatorList from './Pages/CarsPages/OperatorList'
import AddOperatorPage from './Pages/CarsPages/AddOperator'
import CityRateList from './Pages/Rate/CityRate'
import CompleteBooking from './Pages/CarsPages/CompleteBooking'
import CarRequest from './Pages/CarsPages/RequestBooking'
import RequestCarBook from './Pages/CarsPages/RequestCarBook'

import CancelBooking from './Pages/CarsPages/CancelBooking'
import BookingForm from './Pages/CarsPages/Booking/CarBooking'
import LocalChartRate from './Pages/LocalPage/LocalCharRate'
import LocalCategory from './Pages/LocalPage/LocalCategory'
import CitySearch from './Pages/LocalPage/LocalCity'
import AirpotRate from './Pages/AirpotPage/AirpotRate'
import AddCategory from './Pages/Category/Category'
import CategoryList from './Pages/Category/CategoryList'
import RoundCategory from './Pages/Category/RoundCategory'
import Customer from './Pages/Customer/Customer'
import EditCustomer from './Pages/Customer/EditCustomer'
import CustomerDetail from './Pages/Customer/CustomerDetail'
import MainForm from './Components/MainForm'
import OnewayCarList from './Pages/CarList.jsx/OneWayCarList'
import CarList from './Pages/CarList.jsx/CarList'
import CarDropList from './Pages/CarList.jsx/CarDropList'
import RoundCarList from './Pages/CarList.jsx/RoundCarList'
import BookCab from './Pages/BookingCab/BookCab'
import BookAirportCab from './Pages/BookingCab/BookAirportCab'
import BookOnewayCab from './Pages/BookingCab/BookingOneWay'
import RoundTripBook from './Pages/BookingCab/RoundTripBooking'
import Inquiry from './Pages/Inquiry/Inquiry'
import MarketingComponent from './Layouts/Demo'
import WebsiteDetails from './Pages/WebsiteContent/WebsiteDetails'
import TextEditor from './Pages/TextEditor/TextEditor'
import WebsiteMoreDetails from './Pages/WebsiteContent/WebsiteMoreDetails'
import InquiryDetail from './Pages/Inquiry/InquiryDetail'
import VendorList from './Pages/VendorList/VendorList'
import VendorDetails from './Pages/VendorList/VendorDetails'
import AddVendor from './Pages/VendorList/AddVendor'
import Demo from './Pages/Inquiry/Demo'
import TermCondition from './Pages/TermCondition/TermCondition'
import AddTermCondition from './Pages/TermCondition/AddTermCondition'
import EditTermCondition from './Pages/TermCondition/EditTermCondition'
import PackageSetup from './Pages/package/PackageSetup'
import ViewPackage from './Pages/package/ViewPackage'
import ChangePackageSetup from './Pages/package/ChangePackageSetup'
import DemoPackages from './Pages/package/Demo'
import PackageQuery from './Pages/package/PackageQuery'
import MyEditor from './Pages/Editor/MyEditor'
import RoleManagement from './Pages/Role-Management/RoleManagement'

const App = () => {
  return (
    <div className='bg-[#F2F2F7] min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/denied' element={<DeniedPage />} />
    
 
     
        <Route element={<RequireAuth/>} >
        <Route path='/' element={<Home />} />
    
    
          <Route path='/operator' element={<OperatorList />} />
          <Route path='/operator/add' element={<AddOperatorPage />} />
          <Route path='/operator/role' element={<RoleManagement/>} />


          <Route path='/website-content' element={<WebsiteContent />} />
          <Route path='/website-content/details/:name' element={<WebsiteDetails />} />
          <Route path='/website-content/child' element={<WebsiteMoreDetails />} />
          <Route path='/discount-manager' element={<DiscountManager />} />
     
          <Route path='/website-content/about' element={<AboutContent />} />
          <Route path='/website-content/contact' element={<ContactContent />} />
          <Route path='/website-content/testimonial' element={<TestimonialWebsite />} />
          <Route path='/car-list' element={<CarsList />} />


          {/* rate chart */}
          <Route path='/rate-chart/oneway' element={<CityRateList />} />
          <Route path='/rate-chart/local' element={<LocalChartRate />} />
          <Route path='/rate-chart/round' element={<RoundCategory />} />
          <Route path='/rate-chart/airport' element={<AirpotRate />} />


     


          <Route path='/cars/oneway/:pickupName' element={<OnewayCarList />} />
          <Route path='/cars/:cityName' element={<CarList />} />
          <Route path='/cars/from/:pickupName' element={<CarDropList />} />
          <Route path='/cars/round/:pickupName' element={<RoundCarList />} />


          <Route path='/book-cab' element={<BookCab />} />
          <Route path='/book-airport-cab' element={<BookAirportCab />} />
          <Route path='/book-oneway-trip-cab' element={<BookOnewayCab />} />
          <Route path='/book-round-trip-cab' element={<RoundTripBook />} />



          {/* car Booking */}
          <Route path='/cab-booking/list' element={<CarOrders />} />
          <Route path='/cab-booking/book' element={<MainForm />} />
          <Route path='/editor' element={<MyEditor />} />
          <Route path='/text-editor' element={<TextEditor />} />

          {/* car list */}




          {/* local Rate */}
    
          <Route path='/localcategory' element={<LocalCategory />} />
          <Route path='/city/search' element={<CitySearch />} />

          {/*Airpot Rates  */}
       


          <Route path='/cab-list/add' element={<AddCategory />} />
          <Route path='/cab-list/list' element={<CategoryList />} />
        

          <Route path='/customer-detail' element={<Customer />} />
          <Route path='/edit/customer' element={<EditCustomer />} />
          <Route path='/customer/detail' element={<CustomerDetail />} />
          <Route path='/inquiry-list' element={<Inquiry />} />
          <Route path='/inquiry/detail' element={<InquiryDetail />} />
          <Route path='/vendor-list' element={<VendorList />} />
          <Route path='/vendor/details' element={<VendorDetails />} />
          <Route path='/vendor/add' element={<AddVendor />} />
          <Route path='/demo' element={<Demo />} />


          <Route path='/term-condition' element={<TermCondition />} />
          <Route path='/term-condition/add' element={<AddTermCondition />} />
          <Route path='/term-condition/edit' element={<EditTermCondition />} />


          {/* Package */}
          <Route path='/packages/add' element={<PackageSetup />} />
          <Route path='/packages/view' element={<ViewPackage />} />
          <Route path='/packages/setup' element={<ChangePackageSetup />} />
          <Route path='/packages/query' element={<PackageQuery />} />
          <Route path='/packages/demo' element={<DemoPackages />} />

        


        </Route>

        {/* <Route path='/*' element={<PageNotFound />} /> */}



      </Routes>
    </div>
  )
}

export default App
