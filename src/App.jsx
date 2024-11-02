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

const App = () => {
  return (
    <div className='bg-[#F2F2F7] min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/denied' element={<DeniedPage />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route element={<RequireAuth allowedRoles={['Admin','Operator']} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile/:fullName' element={<Profile />} />
          <Route path='/global-settings' element={<GlobalSettingsPage />} />
          <Route path='/operator' element={<OperatorList/>} />
          <Route path='/add' element={<AddOperatorPage/>} />
          <Route path='/website-content' element={<WebsiteContent />} />
          <Route path='/website-content/details/:name' element={<WebsiteDetails/>} />
          <Route path='/website-content/child' element={<WebsiteMoreDetails/>} />
          <Route path='/discount' element={<DiscountManager/>} />
          <Route path='/chart' element={<CityRateList/>} />
          <Route path='/website-content/about' element={<AboutContent />} />
          <Route path='/website-content/contact' element={<ContactContent />} />
          <Route path='/website-content/testimonial' element={<TestimonialWebsite />} />
          <Route path='/car-list' element={<CarsList />} />
         
          <Route path='/boat/:id' element={<BoatDetail />} />
          <Route path='/priest/:id' element={<PriestDetail />} />
          <Route path='/guider/:id' element={<GuiderDetail />} />
          <Route path='/hotel/:id' element={<HotelDetail />} />
          <Route path='/book-detail/:id' element={<CarBookDetails />} />
          <Route path='/boat-book-detail/:id' element={<BoatBookDetails />} />
          <Route path='/priest-book-detail/:id' element={<PriestBookDetails />} />
          <Route path='/guider-book-detail/:id' element={<GuiderBookDetails />} />
          <Route path='/hotel-book-detail/:id' element={<HotelBookDetail />} />
          
          <Route path='/boat-booking' element={<BoatOrders />} />
          <Route path='/priest-booking' element={<PriestOrders />} />
          <Route path='/guider-booking' element={<GuiderOrders />} />
          <Route path='/hotel-booking' element={<HotelOrders />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/boatman-list' element={<BoatList />} />
          <Route path='/priest-list' element={<PriestList />} />
          <Route path='/guider-list' element={<GuiderList />} />
          <Route path='/hotels-list' element={<HotelsList />} />
          
          
          <Route path='/cars/oneway/:pickupName' element={<OnewayCarList />} />
          <Route path='/cars/:cityName' element={<CarList />} />
          <Route path='/cars/from/:pickupName' element={<CarDropList/>} />
          <Route path='/cars/round/:pickupName' element={<RoundCarList/>} />


          <Route path='/book-cab' element={<BookCab />} />
          <Route path='/book-airport-cab' element={<BookAirportCab />} />
          <Route path='/book-oneway-trip-cab' element={<BookOnewayCab />} />
          <Route path='/book-round-trip-cab' element={<RoundTripBook />} />



          {/* car Booking */}
          <Route path='/car-booking' element={<CarOrders />} />
          <Route path='/cancelbooking' element={<CancelBooking/>} />
          <Route path='/completebooking' element={<CompleteBooking/>} />
          <Route path='/request' element={<CarRequest/>} />
          {/* <Route path='/request/approvedbooking/:id' element={<RequestCarBook/>} /> */}
          <Route path='/request/approvedbooking/:id' element={<RequestCarBook/>} />
          <Route path='/carBookings/:id' element={<CarBookDetails/>} />

          <Route path='/booking' element={<MainForm/>} />
          
          <Route path='/text-editor' element={<TextEditor/>} />

          {/* car list */}
        



          {/* local Rate */}
          <Route path='/localRateChart' element={<LocalChartRate/>} />
          <Route path='/localcategory' element={<LocalCategory/>} />
          <Route path='/city/search' element={<CitySearch/>} /> 

           {/*Airpot Rates  */}
           <Route path='/airpotRate' element={<AirpotRate/>} />


           <Route path='/add/category' element={<AddCategory/>} />
           <Route path='/category/list' element={<CategoryList/>} />
           <Route path='/round' element={<RoundCategory/>} />

           <Route path='/customer' element={<Customer/>} />
           <Route path='/edit/customer' element={<EditCustomer/>} />
           <Route path='/customer/detail' element={<CustomerDetail/>} />
           <Route path='/inquiry' element={<Inquiry/>} />
             <Route path='/inquiry/detail' element={<InquiryDetail/>} />
             <Route path='/vendor' element={<VendorList/>} />
             <Route path='/vendor/details' element={<VendorDetails/>} />
             <Route path='/vendor/add' element={<AddVendor/>} />
           <Route path='/demo' element={<Demo/>} />


           <Route path='/view/term/condition' element={<TermCondition/>} />
           <Route path='/add/term/condition' element={<AddTermCondition/>} />
           <Route path='/edit/term/condition' element={<EditTermCondition/>} />
        </Route>



      </Routes>
    </div>
  )
}

export default App
