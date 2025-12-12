import Navigation from "../Navigation";

export default function NavigationExample() {
  return (
    <div className="bg-muted min-h-[200px] relative">
      <Navigation isScrolled={true} />
      <div className="pt-20 p-4">
        <p className="text-muted-foreground">Navigation shown in scrolled state</p>
      </div>
    </div>
  );
}
