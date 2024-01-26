import './index.css';
import './App.css';
import ImageHeader from './components/imageHeader';
import { useState } from 'react';

function App() {
  const [items, setItem] = useState<String[]>(["",""])
  const [inputValue, setValue] = useState<String>("")
  return (
    <>
      <div className=' flex flex-col justify-center items-center'>
        <div className='flex felx-col justify-center items-center '>
          <ImageHeader />
        </div>

        <div className='mt-4 h[350px]'>
          <form action="">
            <input type="text" className='w-full rounderd-sm mb-2' />
            <button type='submit' className='bg-green-70 w-full p-2'>Add</button>
          </form>
        </div>
        <div className=' w-[43vh] overflow-y-auto border  border-slate-600 pl-2 mb-2 py-3'>
          <div className='w-full flex justify-between items-center border-slate-600 p-2 mb-2 py-3'>
            <p>js</p>
            <button className=" text-white font-bold rounded">
              Delete
            </button>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
