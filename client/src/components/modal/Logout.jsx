import React from 'react';

const Logout = ({ modalRef }) => {

   const handleLogout = () => {
      modalRef.current.close();
   };

   return (
      <>
         <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Confirm Logout</h3>
               <p className="py-4">Are you sure you want to logout from your account?</p>
               <div className="modal-action flex justify-end gap-3">
                  <form method="dialog" className="flex gap-3">
                     <button className="btn">Cancel</button>
                     <button type='button' onClick={handleLogout} className="btn bg-red-500 hover:bg-red-600 text-white border-none">Logout</button>
                  </form>
               </div>
            </div>
         </dialog>
      </>
   )
}

export default Logout
