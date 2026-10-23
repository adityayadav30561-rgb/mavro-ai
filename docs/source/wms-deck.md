# Mavro WMS Deck

_Extracted from `Mavro WMS Deck.pptx` (20 slides). Detailed WMS deck: storage, picking, dispatch, compliance, walkthroughs._

## Slide 1

- Product & Implementation Overview
- MAVRO WMS
- Warehouse management from inbound dock to dispatch gate — on one platform.
- Inbound · Putaway · Picking · Dispatch · Counting · Compliance
- Head Office
- 1415, 13th Floor, Galaxy Blue Sapphire, Greater Noida — 201009
- Phone
- +91 92114 29011
- Email
- aditya.y@saisatwik.com

## Slide 2

- Who MAVRO WMS is built for
- Multi-site warehousing
- Plants, depots and hired warehouses on one stock ledger
- High-SKU distribution
- Thousands of SKUs, batch-wise, picked to a daily cut-off
- Regulated storage
- Pharma, food and hazardous stock under statutory rules
- 3PL & multi-client
- Client-owned stock segregated and billed per contract
- Built-in coverage
- Inbound
- Storage
- Picking
- Packing
- Dispatch
- Counting
- Compliance
- MAVRO WMS · Product & Implementation Overview
- 02

## Slide 3

- The problem with today’s method
- Receipt & putaway
- × Trucks arrive unannounced
- × Stock parked wherever there is space
- × Quality hold kept on a paper tag
- Stock received — but not findable
- Accuracy & picking
- × Picking from a printed list
- × FIFO and expiry followed from memory
- × Short picks found at packing
- Book stock and floor stock disagree
- Dispatch & proof
- × Pallets built without weight checks
- × Batch traceability breaks at pack
- × E-way bill checked after gate-out
- Penalties and claims nobody can defend
- MAVRO WMS closes all three gaps — on one platform
- MAVRO WMS · Product & Implementation Overview
- 03

## Slide 4

- Problems MAVRO WMS solves
- Today, without MAVRO
- With MAVRO WMS
- × Trucks arrive unannounced
- ASN captured; dock slots and crew planned
- × Pallets stored wherever there is space
- Directed putaway by velocity, weight, temperature
- × Pick face runs dry mid-wave
- Replenishment raised before the shortage
- × Paper picking; short picks found at packing
- RF scan confirmation at the bin
- × Cartons and pallets built on judgement
- Carton and pallet build from item dimensions
- × Annual stock take with a shutdown
- Perpetual cycle counting by movement and value
- × Statutory checks after the truck leaves
- E-way bill and declarations cleared before gate-out
- MAVRO WMS · Product & Implementation Overview
- 04

## Slide 5

- How MAVRO WMS connects
- MAVRO platform
- ERP & finance
- SAP · Oracle · Tally
- Govt. portal
- E-way bill
- Floor equipment
- ASRS · conveyors
- MAVRO Database
- Single integration layer
- REST · webhooks · batch
- MAVRO WMS
- Web control board
- RF handheld & Android
- Users
- Floor teams
- Supervisors
- Leadership
- Two-way sync keeps your ERP as the system of record — no point-to-point links to maintain.
- MAVRO WMS · Product & Implementation Overview
- 05

## Slide 6

- 53
- modules across five scope blocks — all live
- Deployment follows warehouse readiness, not product release
- 12
- Storage, inbound & pick planning
- 11
- Picking, dispatch & inventory
- 9
- Productivity & automation
- 8
- 3PL, yard & special storage
- 13
- Warehouse compliance for India
- MAVRO WMS · Product & Implementation Overview
- 06

## Slide 7

- Storage, inbound & pick planning
- Bin structure master
- Zone to bin, codes validated against zone rules
- Capacity & weight limits
- Capacity from item size; overloads warned
- ASN & expected receipts
- Arrivals predicted; likely slips flagged
- Dock appointments
- Slots from volume, unload time and labour
- Unloading & goods receipt
- Receipts that differ from the ASN flagged
- Quality hold & quarantine
- Batches held on supplier quality history
- Putaway strategy engine
- Bins by velocity, weight, temperature, space
- Cross-docking
- Inbound lines matched to open orders
- Replenishment
- Pick face refilled before it runs dry
- FIFO / FEFO / LIFO
- Issue order set by remaining shelf life
- Wave & cluster picking
- Waves balanced against cut-offs and slots
- Pick list release
- Sequenced by cut-off, value and pickers
- MAVRO WMS · Product & Implementation Overview
- 07

## Slide 8

- Picking, dispatch & inventory control
- RF pick confirmation
- Mis-scans and short picks caught at the bin
- Packing & cartons
- Carton size picked from item dimensions
- SSCC & pallet labels
- Container codes checked against despatch
- Staging & load sequence
- Multi-drop delivery order kept intact
- Load plan & dispatch
- Weight, volume and axle limits respected
- Cycle counting
- Bins chosen by movement, value and variance
- Stock take & variance
- Variances ranked by value for recount
- Returns & disposition
- Restock, repair, return or scrap advised
- Operator task queue
- Tasks by location, skill and workload
- Bin-to-bin moves
- Rule-breaking moves stopped before confirm
- Warehouse KPI board
- Dock-to-stock and pick rate vs target
- Every pick, pack and count confirmed by scan
- MAVRO WMS · Product & Implementation Overview
- 08

## Slide 9

- Productivity, optimisation & automation
- Slotting optimisation
- Slots recomputed from pick frequency and affinity
- Pick path optimisation
- Shortest aisle route for every pick list
- Voice-directed picking
- Spoken prompts with verified confirmation codes
- Labour standards
- Time standards from real data; outliers flagged
- MHE & forklift allocation
- Equipment matched to task; idle machines flagged
- Kitting & de-kitting
- Components reserved and sequenced to despatch
- Value-added services
- Labelling and bundling time and cost tracked
- ASRS, conveyor & sorter
- Tasks sent as equipment commands, reconciled
- Capacity & peak forecast
- Occupancy projected from inbound plan and season
- MAVRO WMS · Product & Implementation Overview
- 09

## Slide 10

- 3PL, yard & special storage
- 3PL stock segregation
- Client ownership enforced on every bin
- 3PL service billing
- Storage days and handling into client statements
- Yard & trailer slots
- Slots allocated, congestion predicted
- Dock turnaround
- Gate-to-gate time and detention causes
- Serial & batch at pack
- Serials bound to cartons; chain breaks detected
- Cold-chain excursions
- Temperature breaks linked to stored batches
- Hazardous segregation
- Unsafe combinations blocked, safe bins proposed
- Space heat map
- Congestion and dead space mapped by aisle
- MAVRO WMS · Product & Implementation Overview
- 10

## Slide 11

- India compliance · GST & e-way bill
- 6 GST checks, enforced
- Run inside the dispatch transaction — before the truck leaves the gate
- E-way bill at dispatch
- Value and distance validated; bill raised at dispatch
- Part-B vehicle update
- Prompted on transhipment; invalid moves flagged
- E-way bill validity
- Tracked against distance; warned before lapse
- GST Rule 45 job-work challan
- Prescribed particulars; pending returns tracked
- Form ITC-04 data
- Challan-wise despatch and returns, half-yearly
- Section 35 place of business
- Every stocking location checked before posting
- MAVRO WMS · Product & Implementation Overview
- 11

## Slide 12

- India compliance · sector & safety law
- 7 sector checks, enforced
- Applied where the stock sits and is packed — not in a monthly reconciliation
- Customs Sec. 65 · MOOWR
- Duty-deferred balances by bill of entry
- WDRA warehouse receipts
- Licence validity; issue, pledge and release
- Legal Metrology at packing
- Net quantity, MRP and origin verified
- FSSAI storage log
- Temperature and batch movement traced
- CDSCO Schedule M
- Storage, cleaning and pest-control evidence
- Fire NOC & Factories Act
- Approval validity and storage limits per site
- Plastic waste EPR
- Packaging weighed per despatch for filing
- Audit-ready evidence
- Every check logged — user, time, device
- MAVRO WMS · Product & Implementation Overview
- 12

## Slide 13

- Product walkthrough · Control board
- What it answers
- Is the shift on target?
- Which zone is choking?
- What needs a decision this hour?
- Received vs shipped, monthly
- Where accuracy and space drift
- Every tile drills into the transaction behind it
- MAVRO WMS · Product & Implementation Overview
- 13

## Slide 14

- Product walkthrough · Inbound & putaway
- Expected receipts & dock scheduling
- Receipt workflow & directed putaway
- MAVRO WMS · Product & Implementation Overview
- 14

## Slide 15

- Product walkthrough · Picking & dispatch
- Wave execution & RF pick confirm
- Pallet build, SSCC & dispatch clearance
- MAVRO WMS · Product & Implementation Overview
- 15

## Slide 16

- Platform features
- Audit trail
- Every movement logged — user, bin, device, time; 7-year retention
- Notifications
- Shortage, hold and excursion alerts — push, email, in-app
- RF & mobile app
- Handheld and Android for putaway, picking and counting; offline-capable
- Workflow engine
- No-code approvals, hold release, escalations and SLA timers
- Security & access
- RBAC by warehouse, zone and client; AES-256, MFA / SSO
- Integration APIs
- REST, webhooks and batch — scanners, ASRS, ERP, e-way bill
- Scalable architecture
- Multi-warehouse, multi-client, multi-state; cloud-native
- Dual rule engine
- Storage rules and process flows — configured, not coded
- MAVRO WMS · Product & Implementation Overview
- 16

## Slide 17

- Why MAVRO vs disconnected systems
- Capability
- MAVRO WMS
- Excel & registers
- ERP stock module
- Barcode tool
- Bin-level stock, capacity & weight
- ✓ Full
- ✕ No
- ◐ Location only
- ◐ Partial
- Directed putaway
- ✓ Built-in
- ✕ No
- ✕ No
- ✕ No
- Wave planning, FEFO & cut-offs
- ✓ Native
- ✕ No
- ◐ FIFO only
- ✕ No
- RF scan confirm, live short-picks
- ✓ Automatic
- ✕ No
- ✕ No
- ◐ Scan only
- SSCC, load plan & axle checks
- ✓ Built-in
- ✕ No
- ✕ No
- ◐ Labels only
- E-way bill, Rule 45, Legal Metrology
- ✓ Enforced
- ✕ No
- ◐ Partial
- ✕ No
- 3PL segregation & billing
- ✓ Included
- ✕ No
- ✕ No
- ✕ No
- Implementation time
- 25–30 days
- —
- 8–12 weeks
- 2–3 weeks
- ✓ Native / full
- ◐ Partial / add-on
- ✕ Not available
- MAVRO WMS · Product & Implementation Overview
- 17

## Slide 18

- Expected business impact
- 55%
- faster dock-to-stock
- Under 4 hours with directed putaway
- 99%+
- inventory accuracy
- Perpetual counting, no annual shutdown
- 30%
- less pick travel
- Slotting and paths from real movement
- 70%
- fewer pick-face stops
- Depletion forecast, tasks raised early
- MAVRO WMS · Product & Implementation Overview
- 18

## Slide 19

- Implementation · live in 25–30 days
- Weeks 1–2
- Discovery & setup
- Bin structure mapped and signed off
- Modules configured remotely
- Masters migrated, UAT prepared
- Week 3
- Inbound go-live
- ASN, docks, receipt and putaway live
- RF training by zone
- Same-day issue resolution
- Week 4
- Full go-live
- Picking, dispatch, counting and compliance live
- SOPs written with your team
- Team runs the board independently
- Ongoing
- AMS support
- Dedicated contact after go-live
- Fixes, enhancements and change requests
- Monthly performance review
- MAVRO WMS · Product & Implementation Overview
- 19

## Slide 20

- Thank you
- Next step: one working session on your warehouse
- Walk your zone, rack and bin structure
- Map one receiving cycle end to end
- Agree the 25–30 day window and on-site need
- Aditya Kumar Yadav
- Business Development Executive
- aditya.y@saisatwik.com
- +91 92114 29011
- www.saisatwik.com
- 1415, 13th Floor, Galaxy Blue Sapphire, Greater Noida — 201009
- SaiSatwik Technologies · MAVRO WMS
