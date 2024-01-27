import './index.css';
import './App.css';
import ImageHeader from './components/imageHeader';
import { useState } from 'react';
import Input from './components/input';
import Button from './components/Button';
import type Items from './components/types';

function App() {
  const [items, setItem] = useState<Items[]>([])
  const [inputValue, setValue] = useState<String>("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setItem((prev) => [...prev, { title: inputValue, id: Date.now().toString() }]);
    setValue("")
  }

  return (
    <>
      <div className=' flex flex-col justify-center items-center'>
        <div className='flex felx-col justify-center items-center '>
          <ImageHeader />
        </div>

        <div className='mt-4 h[350px]'>
          <form onSubmit={handleSubmit}>
            <Input inputValue={inputValue} setValue={setValue}/>
            <Button className={'bg-green-70 w-full p-2'}>Add</Button>
          </form>
        </div>
        <div className=' w-[43vh] overflow-y-auto border  border-slate-600 pl-2 mb-2 py-3'>
          {items.map(data => (
            <div key={data.id} className='w-full flex justify-between items-center border-slate-600 p-2 mb-2 py-3'>
              <p>{data.title}</p>
              <Button onClick={() => deleteTask(data.id)} className={" text-white font-bold rounded"}>
                X
              </Button>
            </div>
          ))}

        </div>
      </div >
    </>
  )
}

export default App
