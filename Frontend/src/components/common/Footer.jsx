const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <span className="text-sm">
        Where 2 Stay | All Rights Reserved &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default FooterComponent;
