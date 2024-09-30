import { useNavigate } from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/')}
      className="flex items-center cursor-pointer font-poppins text-black"
    >
      <span className="ml-2 text-2xl font-normal text-[#10A760]">Pharma</span>
      <span className="text-2xl font-bold text-black">Plus</span>
    </div>
  );
};
