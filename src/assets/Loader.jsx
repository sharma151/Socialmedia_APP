import { BallTriangle } from "react-loader-spinner";

const Loader = ({ className }) => {
  return (
    <div className={className}>
      <BallTriangle
        height={70}
        width={70}
        radius={5}
        color="#243642"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
