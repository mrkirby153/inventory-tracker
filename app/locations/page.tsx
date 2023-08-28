import { getCurrentUser } from "@app/auth/helpers";
import Button from "@app/components/button";
import { getLocation, getLocations } from "@app/db/locations";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import invariant from "invariant";
import { Metadata } from "next";

interface LocationProps {
  id: string;
}

async function Location(props: LocationProps) {
  let location = await getLocation(props.id);
  invariant(location, "Location must not be null");

  return (
    <div className="rounded-md border-2 p-3">
      <h3 className="text-2xl">{location.name}</h3>
      <span className="italic text-gray-500">{location.location}</span>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Locations",
};

export default async function Locations() {
  let currentUser = await getCurrentUser();
  let locations = await getLocations(currentUser);

  let locationComponents = locations.map((location) => {
    return <Location key={location.id} id={location.id} />;
  });

  return (
    <>
      <div className="flex justify-center mt-3 mb-3">
        <div className="mx-auto w-full max-w-[75%]">
          <h1 className="text-5xl mb-3">Locations</h1>
          <div className="flex flex-col gap-3 mb-3">{locationComponents}</div>
          <a href="/locations/new">
            <FontAwesomeIcon icon={faPlus} /> Add Location
          </a>
        </div>
      </div>
    </>
  );
}
