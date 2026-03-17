interface CardProps {
  image: string;
  descricao: string;
  textoBotao: string;

}

export function Card({ image, descricao, textoBotao }: CardProps){


    return(
        <div className=" rounded-xl bg-white flex flex-col justify-center items-center gap-[8px] text-black">
            <img src={image} alt="" className="w-[350px] h-[200px] rounded-t-xl"/>

            <div className="max-w-xs">
                <p>{descricao}</p>
            </div>

            <div className="w-xs m-[10px]" >
                <button className="py-2 px-8 bg-black rounded-[16px] text-white cursor-pointer">{textoBotao}</button>
            </div>

        </div>

    )
}