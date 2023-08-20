const Error = () => {
  return (
    <section
      className="page_404 px-0 py-10;
  bg-white font-[Poppins] "
    >
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble\_1.gif)] h-[400px] bg-center">
                <h1 className="text-center text-[80px]">404</h1>
              </div>

              <div className="contant_box_404 mt-[-50px]">
                <h3 className="h2 text-[80px]">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <a
                  href="/dashboard"
                  className="link_404 bg-green-400 hover:bg-green-600 duration-75 text-white inline-block mx-0 my-5 px-5 py-2.5"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
