import MenuNavegacao from "../../components/menu";


export default function CadastroUsuarios() {




    return (

               <>
                   <MenuNavegacao />
       
                   <div>
                       <div className="w-[100v] h-[100vh] flex justify-center items-center flex-col gap-[8px] bg-gray-900 ">
                           <h1 className="text-5xl text-center mb-8">Cadastro de usuários</h1>
                           <form action="" className="flex flex-col justify-center items-center gap-[8px] bg-gray-700 text-white p-12 rounded-xl">
       
                               <div className="flex flex-col gap-[8px]">
                                   <label htmlFor="">Nome</label>
                                   <input type="text" className="bg-gray-200 text-black placeholder:text-gray-400  rounded-xl py-2 w-96 px-4" />
                               </div>
       
                               <div className="flex flex-col gap-[8px]">
                                   <label htmlFor="">Email</label>
                                   <input type="email" className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4" />
                               </div>
       
                               <div className="flex flex-col gap-[8px]">
                                   <label htmlFor="">Telefone</label>
                                   <input type="text" className="bg-gray-200 text-black placeholder:text-gray-400 rounded-xl py-2 w-96 px-4" />
                               </div>
       

       
                               <button className="mt-8 w-full bg-green-600 hover:bg-green-500 py-2 rounded-xl cursor-pointer">Cadastrar</button>
       
       
                           </form>
                       </div>
                   </div>
               </>
    )
}