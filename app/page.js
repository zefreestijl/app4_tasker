import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <h1 className="text-3xl font-bold underline">
          Testing
        </h1>

        <div className="" data-theme="pink" >

          <br /> <br />
          <button
            className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
            Button
          </button>

          <br /> <br />
          <button className="btn">Button</button>

          <br /> <br />
          <button className="btn btn-primary">Button</button>
          <button className="btn btn-secondary btn-outline">Button</button>
          <button className="btn btn-accent">Button</button>

          <button className="btn bg-accent/20 btn-outline">Button</button>

          <br /> <br />
          <button className="btn w-64 rounded-full  ">Button</button>

          <div className="columns-5">
            <p>Well, let me tell you something, ...</p>
            <p className="break-after-column">Sure, go ahead, laugh...</p>

            <p>Maybe we can live without...</p>

          </div>
        </div>

      </div>

    </div>
  );
}
