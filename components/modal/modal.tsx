import React from 'react'
import DemoForm from '../forms/demo-form'

function Modal() {
  return (
<>
      <input type="checkbox" id="demo-modal-toggle" className="peer/modal hidden" />

    <div className="fixed inset-0 z-[100] hidden peer-checked/modal:flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all duration-300">
        {/* Modal Card Container */}
        <div className="bg-white rounded-[32px] border border-orange-100/40 p-6 sm:p-8 md:p-10 shadow-2xl max-w-xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button label trigger */}
          <label
            htmlFor="demo-modal-toggle"
            className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-900 cursor-pointer p-1.5 rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center"
            aria-label="Close modal"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>

          {/* Form Content */}
          <DemoForm />
          
        </div>

        {/* Click outside backdrop label trigger */}
        <label
          htmlFor="demo-modal-toggle"
          className="absolute inset-0 cursor-default"
          ></label>
      </div>
          </>
  )
}

export default Modal
