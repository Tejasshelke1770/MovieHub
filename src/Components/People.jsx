import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopNav from './templates/TopNav'
import axios from "../Utils/Axios";
import Cards from './templates/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const People = () => {
    const Navigate = useNavigate()
    const [person, setPerson] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    // console.log(person)

    const getPeople = async()=>{
        try {
            const{data} = await axios.get(`/person/popular?language=en-US&page=${page}`)
            // console.log(data)
           if(data.results.length > 0){
            setPerson((prev)=> [...prev, ...data.results])
            setPage(page + 1)
           }else{
            setHasMore(false)
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPeople()
    }, [])

  return person.length > 0 ? (
    <div className='w-screen h-screen'>
      <div className='w-full px-[3%] flex items-center '>
        <h1 className='text-zinc-400 text-2xl font-semibold whitespace-nowrap'><i
            onClick={() => Navigate(-1)}
            className="ri-arrow-left-line text-white mr-3  hover:text-[#6556CD] "
          ></i>Popular Person
        </h1>
          <div className='flex items-center gap-10 w-[90%]'>
            <TopNav />
          </div>
      </div>
      <InfiniteScroll
      loader={<h1 style={{textAlign:"center", backgroundColor:"#1F1E24", color:"white" }}>Loading...</h1>}
      dataLength={person.length}
      hasMore={hasMore}
      next={getPeople}
      >
        <Cards data={person} title='person'/>
      </InfiniteScroll>

    </div>
  ) : <Loading/>
}

export default People
