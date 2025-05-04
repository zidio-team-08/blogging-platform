import React, { useState, useEffect, useRef } from 'react'
import Editor from '../components/Editor';
import BlogPreview from '../components/BlogPreview';

const NewStory = () => {
    const [tags, setTags] = useState([])
    const [step, setStep] = useState(2);

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const handleNext = () => {

    }

    return (
        <>
            <div className="max-w-6xl mx-auto  px-5 py-8">
                <div className='max-w-4xl mx-auto '>
                    <div className='w-full flex items-center justify-center'>
                        <ul className="steps w-full mb-10">
                            <li className={`step text-sm font-semibold ${step >= 1 && ' step-primary'}`}>Write story</li>
                            <li className={`step text-sm font-semibold ${step >= 2 && ' step-primary'}`}>Preview</li>
                            <li className={`step text-sm font-semibold ${step == 3 && ' step-primary'}`}>Done</li>
                        </ul>
                    </div>
                    {/* editor step 1 */}
                    {step == 1 && (<Editor />)}
                </div>
                {/* preview step 2 */}
                {step == 2 && (<BlogPreview />)}

            </div>
        </>
    )
}

export default NewStory
