import React, { useState } from "react";
import PlaceItemCard from "./PlaceItemCard";
import SideDrawer from "./SideDrawer";
import Skelton from "./Skelton";

function PlaceList({ placeList }: any) {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  return (
    <div className="z-10 mt-14 px-2.5 md:px-30">
      <h2 className="mb-3 text-[20px] font-bold">Search Results</h2>

      {placeList?.length > 0 ? (
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-3 lg:grid-cols-4">
          {placeList.map((place: any, index: number) => (
            <div
              key={place?.place_id || `${place?.name}-${index}`}
              className="z-10 h-full"
              onClick={() => setSelectedPlace(place)}
            >
              <PlaceItemCard place={place} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-full">
              <Skelton />
            </div>
          ))}
        </div>
      )}

      {selectedPlace?.name && (
        <div className="fixed right-0 top-0 z-20">
          <SideDrawer
            place={selectedPlace}
            close={() => setSelectedPlace(null)}
          />
        </div>
      )}
    </div>
  );
}

export default PlaceList;