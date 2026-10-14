# Celeste house – 3D model

Interactive 3D model of the Lennar **Celeste** plan (Verdana Grove, Miami): 4 bd · 2 ba · 1,824 ft².

Open `index.html` in a browser (it loads three.js from jsDelivr).

Views:
- **Exterior**: orbit around the house.
- **Dollhouse**: roof removed, with room labels.
- **Floor plan**: top-down view.
- **Walk through**: first-person. Drag to look, use W A S D or the arrow keys to move.

## Sources
- `plans/celeste-floorplan.pdf`: Lennar floor plan. All walls, doors and windows are traced from it.
  The scale comes from the garage, which is 19'5" wide.
- Exterior colors and materials follow the Lennar elevation renderings: gray stucco, charcoal
  shingle hip roof, front gable over Bedroom 4, dark green shutters and garage door.

## Assumptions
- 9 ft ceilings, 4.5/12 main roof pitch, 7/12 front gable.
- Furniture is placeholder, sized from the plan's furniture outlines.

Add your own photos to `photos/` to refine colors, flooring and finishes.

## Wadi design file

`celeste.wdl` is the same house written in the [Wadi](https://github.com/bijoor/wadi)
design language, using its architect skill. It defines a structural grid of wall
centrelines, rooms with their doors and windows, furniture from Wadi's standard pack,
and the roof: a main hip with a steeper street-facing gable over Bedroom 4.
Open it in the Wadi DSL editor (<https://wadi.house/dsl>) to see it live in 3D, edit it,
and export plans.

`drawings/` holds the dimensioned drawings Wadi generated from that file: the floor plan,
four elevations and the roof plan. The 3D page shows them under **Drawings**.
Wadi names elevations by the drawing's top edge, so its "Back Elevation" is the street side.

To re-check or re-render after editing the `.wdl` (with a Wadi checkout):

    wadi-skill/architect/scripts/check.sh   /path/to/celeste.wdl
    wadi-skill/architect/scripts/preview.sh /path/to/celeste.wdl
