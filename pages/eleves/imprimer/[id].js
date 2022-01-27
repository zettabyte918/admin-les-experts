import { useRouter } from "next/router";

const Imprimer = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Imprimer: {id}</p>;
};

export default Imprimer;
