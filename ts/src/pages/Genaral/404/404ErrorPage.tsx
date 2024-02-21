import './404Error.css'
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
const ErrorPage = () => {
    const apiKey = "W7KRn2JNTycH8QoI9b0CVHczMD0rTofH";

    const config = {
        headers: {
            'apikey': apiKey
        }
    };

    
    const [selectedOption, setSelectedOption] = useState('');
    const [data, setData] = useState(null);

    const handleChange = async (event) => {
        const option = event.target.value;
        setSelectedOption(option);
        try {
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const on = async(e:ChangeEvent<HTMLInputElement>) => {
        const response = await axios.get(`https://api.apilayer.com/skills?q=${e.target.value}`, config)
        console.log(response)
        setData(response.data);
    }
    return <div>
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>
                                <p>the page you are looking for not avaible!</p>
                                <p className="link_404">Go to Home</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <input type="text"onChange={on} placeholder='"sdfdsf'/>
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>

                    {data && (
                        <div>
                            <h2>Selected Option: {selectedOption}</h2>
                            <h3>Data:</h3>
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    )}
                </div>

            </div>
        </section>
    </div>;
}



export default ErrorPage;