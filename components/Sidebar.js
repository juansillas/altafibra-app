import Image from 'next/image';
import useQuiosco from '@/hooks/useQuiosco';
import Categoria from './Categoria';

const Sidebar = () => {
    const  {categorias} = useQuiosco();

  return (
    <>
        <Image 
        width={448} 
        height={217}
        src="/assets/img/logo.png" 
        alt="imagen logotipo"

        />

        <nav className="mt-10"> 
              {categorias.map(categoria => (
                  <Categoria
                    key={categoria.id}
                    categoria={categoria}
                  />
              ))}
        </nav>
    </>
  );
};

export default Sidebar;