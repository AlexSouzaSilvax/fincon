import edigitalLogo from "@/assets/edigital-logo.svg";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center gap-4">
      <img src={edigitalLogo} className="flex-1 max-w-[60px] max-h-[60px]" />
      <h1 className="font-semibold text-3xl">Página não encontrada!</h1>
      <p className="text-lg text-muted-foreground">
        Não foi possível encontrar a página que você esta procurando.
        <br />
        Caso esta página exista realmente, nossa equipe está trabalhando para
        resolver o problema
        <br />
        Aguarde um instante e tente novamente!
      </p>
        
    </div>
  );
}
