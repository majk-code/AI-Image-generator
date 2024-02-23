import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/defaultimage.jpeg'
import generate_icon from '../Assets/magic.png'

const ImageGenerator = () => {

    // Type here your private token from open AI
    OpenAI_Private_Token = ''
    
    const [image_url, SetImage_url] = useState('/')
    let inputRef = useRef(null)

    const ImageGenerating = async () => {
        if (inputRef.current.value === '') {
            return 0
        }

        const response = await fetch (
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization:
                    `Bearer ${OpenAI_Private_Token}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                })
            }
        )
        let data = await response.json()
        SetImage_url(data);
    }

  return (
    <div className='image-generator'>
        <div className="image-generator-wrapper">
            <h1>// Generate your imagination.</h1>
            <div className="image-generator-container">
                <div className="image-generator-image">
                    <img src={image_url === '/' ? default_image : image_url} alt="" />
                </div>
                <div className="image-generated-text">
                    <span className='generated-result-span'>Amazing imagination of colorful sky view</span>
                </div>
            </div>
            <div className="prompt-wrapper">
                <div className="prompt-container">
                    <input ref={inputRef} placeholder='Try to generate something..' className='prompt-input' type="text" />
                    <div className="generate-btn">
                        <img className='generate-btn-icon' src={generate_icon} alt="" />
                        <button className="send-prompt" onClick={()=> {ImageGenerating()}}>Generate</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImageGenerator