import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate()

  const handleListing =()=>{
    navigate('/shop/listing')
  }
  return (
    <div>
      Home
      <button className='p-2 bg-black text-white' onClick={handleListing}>Listing</button>
    </div>
  )
}

export default Home
