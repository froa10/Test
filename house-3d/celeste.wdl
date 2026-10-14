// Lennar "Celeste" — Verdana Grove, Miami FL. 4 bd · 2 ba · 1,824 ft², one storey.
// Authored with the Wadi architect skill (github.com/bijoor/wadi). Source drawing:
// plans/celeste-floorplan.pdf. Grid lines are wall CENTRELINES, 10 units = 1 ft,
// north at the top of the plan (patio side), street to the south.
house Celeste {
  convention center
  units feet_inches per_unit 10

  // 51' × 112' lot: ~6' side yards, 25' back yard, 25' front setback.
  site { plot (510, 1120) ref (0, 0) }
  defaults { floor_height 90 wall_height 90 slab_thickness 0 wall_thickness 6 }  // 9' ceilings, slab-on-grade (C3/C4)

  import "std-furniture" as f

  var ox = 62                 // house west wall, from the lot's west line
  var oy = 250                // house north wall, from the lot's back line

  template {
    title       "Celeste"
    description "Lennar Celeste plan: split-bedroom ranch with an open kitchen, family and dining core and a front-loading 2-car garage."
    style       "florida-ranch"
    roof        "hip"
  }

  // x: west → east                         y: north → south
  guides g {
    x: W    @ ox,                           // west exterior wall
       hall @ ox + 102,                     // hall / bedroom 3 & bath 2
       fam  @ ox + 108,                     // dining+kitchen | family room
       clo  @ ox + 115,                     // bedroom 2 & 4 closet fronts
       foy  @ ox + 138,                     // bedroom wing | foyer
       gar  @ ox + 192,                     // foyer | garage, HVAC, laundry
       hv   @ ox + 237,                     // HVAC | linen
       own  @ ox + 258,                     // family | owner's suite
       obth @ ox + 294,                     // vestibule | owner's bath
       E    @ ox + 386                      // east exterior wall
    y: N    @ oy,                           // north (rear) exterior wall
       din  @ oy + 101,                     // dining | kitchen
       ste  @ oy + 138,                     // owner's suite | bath
       pan  @ oy + 181,                     // pantry
       cor  @ oy + 191,                     // family room | utility core
       wic  @ oy + 226,                     // owner's bath | walk-in closet
       b2   @ oy + 230,                     // kitchen | bedroom 2
       garN @ oy + 313,                     // laundry & WIC | garage
       b3   @ oy + 331,                     // bedroom 2 | bedroom 3
       c3   @ oy + 431,                     // bedroom 3 closet
       ent  @ oy + 443,                     // front-door wall
       ba2  @ oy + 454,                     // bath 2
       b4   @ oy + 510,                     // bath 2 / hall | bedroom 4
       garS @ oy + 515,                     // garage door wall
       S    @ oy + 612                      // bedroom 4 front wall
  }

  floor 0 "Slab" height 6 {                 // slab-on-grade, 6" above the yard (C1)
    ground name "Lot" at (0, 0) size (510, 1120) layer "ground"
    plinth name "House slab" at (g.xW, g.yN) size (g.xE - g.xW, g.ygarS - g.yN) height 6 layer "plinth"
    plinth name "Bedroom 4 slab" at (g.xW, g.ygarS) size (g.xfoy - g.xW, g.yS - g.ygarS) height 6 layer "plinth"
    plinth name "Rear patio" at (g.xW + 35, g.yN - 42) size (77, 42) height 6 layer "plinth"
  }

  floor 1 "Ground Floor" slab_thickness 0 {

    // ---------- Living core: dining, kitchen, family room (open plan) ----------
    room Dining at (g.xW, g.yN) size (g.xfam - g.xW, g.ydin - g.yN) type dining {
      connect Kitchen Family
      wall north { door Slider at 45 size (57, 80) }       // sliding glass door to the patio
      wall west  { window DinW at 38 size (29, 50) sill 30 }
      item f."dining_table" anchor center rotation 90
    }
    room Kitchen at (g.xW, g.ydin) size (g.xfam - g.xW, g.yb2 - g.ydin) type kitchen {
      connect Family Gallery
      wall west south
      counter name "Range wall" anchor center-left length 110 depth 24 height 36 cabinet hob 40
      counter name "Island" anchor center gap (6, -10) rotation 90 length 70 depth 32 height 36 cabinet sink 35
    }
    // Pantry: a closet tucked into the kitchen's south-west corner.
    wall Pantry1 from (g.xW, g.ypan) to (g.xW + 38, g.ypan) height 90
    wall Pantry2 from (g.xW + 44, g.ypan + 16) to (g.xW + 44, g.yb2) height 90

    room Family at (g.xfam, g.yN) size (g.xown - g.xfam, g.ycor - g.yN) type living {
      connect Vestibule
      wall north { window FamN at 64 size (43, 50) sill 30 }
      item f."sofa_corner" anchor top-left gap (8, 20)
      item f."coffee_table" anchor center gap (10, 25)
      item f."tv_unit" anchor center-right gap (4, 0)
    }
    // the walkway from the family room past the fridge to the foyer
    room Gallery at (g.xfam, g.ycor) size (g.xgar - g.xfam, g.yb2 - g.ycor) type hall {
      connect Foyer
      wall east { door HvacDoor at 4 size (26, 80) }       // the HVAC closet opens off the gallery
      item f."fridge" anchor bottom-left gap (6, 4) rotation 90
    }

    // ---------- Owner's wing (east) ----------
    room OwnersSuite at (g.xown, g.yN) size (g.xE - g.xown, g.yste - g.yN) type bedroom {
      connect Vestibule OwnersBath
      wall north { window OwnN at 42 size (43, 50) sill 30 }
      wall east west
      wall south { door OwnDoor at 6 size (26, 80)
                   door OwnBathDoor at 76 size (26, 80) }
      item f."bed_double" anchor center-right gap (4, 0) rotation 270
      item f."bedside_table" anchor top-right gap (4, 14)
    }
    room Vestibule at (g.xown, g.yste) size (g.xobth - g.xown, g.ycor - g.yste) type hall { wall east }
    room OwnersBath at (g.xobth, g.yste) size (g.xE - g.xobth, g.ywic - g.yste) type bathroom {
      connect WalkInCloset
      wall east west
      wall south { door WicDoor at 36 size (24, 80) }
      item f."shower" anchor top-left gap (4, 4)
      item f."bathroom_sink" anchor center-right gap (2, -12) rotation 270
      item f."bathroom_sink" anchor center-right gap (2, 12) rotation 270
      item f."toilet" anchor bottom-left gap (12, 2) rotation 180
    }
    room WalkInCloset at (g.xown, g.ywic) size (g.xE - g.xown, g.ygarN - g.ywic) type storage {
      wall east west south
      item f."wardrobe" anchor bottom-center gap (0, 2)
    }

    // ---------- Utility core ----------
    room HVAC at (g.xgar, g.ycor) size (g.xhv - g.xgar, g.ywic - g.ycor) type utility {
      wall north east south
    }
    room Linen at (g.xhv, g.ycor) size (g.xobth - g.xhv, g.ywic - g.ycor) type storage {
      wall north { door LinenDoors at 3 size (50, 80) }
      wall east south
    }
    room Laundry at (g.xgar, g.ywic) size (g.xown - g.xgar, g.ygarN - g.ywic) type utility {
      wall north east
      wall west  { door LaundryDoor at 5 size (26, 80) }
      wall south { door GarageDoor at 7 size (26, 80) }
      item f."washing_machine" anchor center-right gap (2, -14) rotation 270
      item f."washing_machine" anchor center-right gap (2, 14) rotation 270
    }

    // ---------- Entry ----------
    room Foyer at (g.xfoy, g.yb2) size (g.xgar - g.xfoy, g.yent - g.yb2) type hall {
      connect Hall Laundry
      wall south { door FrontDoor at 11 size (30, 80) }
    }
    room Porch at (g.xfoy, g.yent) size (g.xgar - g.xfoy, g.ygarS - g.yent) type verandah {
      wall west east
    }

    // ---------- Bedroom wing (west) ----------
    room Bedroom2 at (g.xW, g.yb2) size (g.xfoy - g.xW, g.yb3 - g.yb2) type bedroom {
      connect Hall
      wall north east west { window B2W at 33 size (39, 50) sill 30 }
      wall south { door B2Door at 107 size (26, 80) }
      item f."bed_double" anchor top-center gap (-10, 4)
    }
    wall Closet2 from (g.xclo, g.yb2) to (g.xclo, g.yb2 + 66) height 90 {
      door Closet2Doors at 6 size (52, 80)
    }
    wall Closet2End from (g.xclo - 3, g.yb2 + 66) to (g.xfoy, g.yb2 + 66) height 90

    room Hall at (g.xhall, g.yb3) size (g.xfoy - g.xhall, g.yb4 - g.yb3) type hall {
      connect Bedroom3 Bath2 Bedroom4
      wall east { door ToFoyer at 28 size (42, 80) open
                  }
    }
    room Bedroom3 at (g.xW, g.yb3) size (g.xhall - g.xW, g.yc3 - g.yb3) type bedroom {
      wall north west { window B3W at 35 size (30, 50) sill 30 }
      wall east { door B3Door at 72 size (26, 80) }
      item f."bed_double" anchor top-center gap (-6, 4)
    }
    room Closet3 at (g.xW, g.yc3) size (g.xhall - g.xW, g.yba2 - g.yc3) type storage {
      wall west south east
      wall north { door Closet3Doors at 10 size (78, 80) }
    }
    room Bath2 at (g.xW, g.yba2) size (g.xhall - g.xW, g.yb4 - g.yba2) type bathroom {
      wall west south north
      wall east { door Bath2Door at 2 size (26, 80) }
      item f."bathtub" anchor center-left gap (2, 0)
      item f."toilet" anchor bottom-center gap (-8, 2) rotation 180
      item f."bathroom_sink" anchor bottom-right gap (6, 2) rotation 180
    }
    room Bedroom4 at (g.xW, g.yb4) size (g.xfoy - g.xW, g.yS - g.yb4) type bedroom {
      wall west east
      wall north { door B4Door at 104 size (26, 80) }
      wall south { window B4S at 56 size (29, 50) sill 30 }
      item f."bed_double" anchor center-left gap (4, 0) rotation 90
    }
    wall Closet4 from (g.xclo, g.yb4 + 36) to (g.xclo, g.yS) height 90 {
      door Closet4Doors at 6 size (52, 80)
    }
    wall Closet4End from (g.xclo - 3, g.yb4 + 36) to (g.xfoy, g.yb4 + 36) height 90

    // ---------- Garage ----------
    room Garage at (g.xgar, g.ygarN) size (g.xE - g.xgar, g.ygarS - g.ygarN) type garage {
      wall north east west
      wall south { door OverheadDoor at 24 size (158, 70) }
    }
  }

  floor 2 "Roof" {
    // Main hip roof over the whole rectangle, ridge running north–south.
    roof name "Main hip" pitched endpoint closed slope angle 21 overhang 18 {
      segment "main" from (g.xW + 193, g.yN) to (g.xW + 193, g.ygarS) width 386
    }
    // Steeper street-facing gable over the Bedroom 4 wing.
    roof name "Front gable" pitched endpoint closed slope angle 30 overhang 18 {
      segment "gable" from (g.xW + 69, g.yS) to (g.xW + 69, g.yb3) width 138
        start_endpoint open end_endpoint closed
    }
  }
}
