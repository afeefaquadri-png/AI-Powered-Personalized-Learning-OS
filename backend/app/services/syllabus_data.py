"""
Real syllabus chapter lists for major educational boards.
Chapters are taken directly from official board syllabi — not AI-generated.

Supported boards: CBSE, ICSE, IB (MYP/DP), Cambridge IGCSE, Common Core (US)
"""

from typing import TypedDict


class ChapterDef(TypedDict):
    order_index: int
    title: str
    description: str


# ─────────────────────────────────────────────────────────────────────────────
# CBSE  (Central Board of Secondary Education, India — NCERT based)
# ─────────────────────────────────────────────────────────────────────────────
CBSE: dict[str, dict[str, list[ChapterDef]]] = {
    "Mathematics": {
        "6": [
            {"order_index": 1, "title": "Knowing Our Numbers", "description": "Large numbers, comparing numbers, estimation and Roman numerals."},
            {"order_index": 2, "title": "Whole Numbers", "description": "Natural numbers, whole numbers, number line and properties of operations."},
            {"order_index": 3, "title": "Playing with Numbers", "description": "Factors, multiples, prime and composite numbers, HCF and LCM."},
            {"order_index": 4, "title": "Basic Geometrical Ideas", "description": "Points, lines, line segments, rays, angles, curves and polygons."},
            {"order_index": 5, "title": "Understanding Elementary Shapes", "description": "Measuring line segments, angles, triangles and polygons."},
            {"order_index": 6, "title": "Integers", "description": "Introduction to negative numbers, integer number line, addition and subtraction."},
            {"order_index": 7, "title": "Fractions", "description": "Fractions on a number line, proper/improper fractions, equivalent fractions, operations."},
            {"order_index": 8, "title": "Decimals", "description": "Tenths and hundredths, comparing decimals, addition and subtraction of decimals."},
            {"order_index": 9, "title": "Data Handling", "description": "Recording data, pictographs, bar graphs and tally marks."},
            {"order_index": 10, "title": "Mensuration", "description": "Perimeter of various shapes, area of rectangles and squares."},
            {"order_index": 11, "title": "Algebra", "description": "Introduction to variables, expressions and simple equations."},
            {"order_index": 12, "title": "Ratio and Proportion", "description": "Ratio, proportion and unitary method."},
            {"order_index": 13, "title": "Symmetry", "description": "Lines of symmetry, reflection symmetry and figures with two lines of symmetry."},
            {"order_index": 14, "title": "Practical Geometry", "description": "Drawing circles, line segments, perpendiculars and angles with a compass."},
        ],
        "9": [
            {"order_index": 1, "title": "Number Systems", "description": "Irrational numbers, real numbers, decimal expansions and surds."},
            {"order_index": 2, "title": "Polynomials", "description": "Definitions, zeroes of a polynomial, remainder and factor theorems."},
            {"order_index": 3, "title": "Coordinate Geometry", "description": "Cartesian plane, plotting points, distance formula basics."},
            {"order_index": 4, "title": "Linear Equations in Two Variables", "description": "Solutions, graph of a linear equation and equations of lines parallel to axes."},
            {"order_index": 5, "title": "Introduction to Euclid's Geometry", "description": "Euclid's definitions, axioms and postulates."},
            {"order_index": 6, "title": "Lines and Angles", "description": "Pairs of angles, parallel lines, transversals and angle sum property."},
            {"order_index": 7, "title": "Triangles", "description": "Congruence criteria (SAS, ASA, SSS, RHS), properties of isosceles triangles."},
            {"order_index": 8, "title": "Quadrilaterals", "description": "Angle sum property, properties of parallelogram, mid-point theorem."},
            {"order_index": 9, "title": "Circles", "description": "Chord properties, angle subtended by an arc, cyclic quadrilaterals."},
            {"order_index": 10, "title": "Heron's Formula", "description": "Area of a triangle using Heron's formula and applications."},
            {"order_index": 11, "title": "Surface Areas and Volumes", "description": "Cuboids, cylinders, cones, spheres — surface area and volume."},
            {"order_index": 12, "title": "Statistics", "description": "Collection and presentation of data, mean, median and mode."},
            {"order_index": 13, "title": "Probability", "description": "Empirical probability and basic probability experiments."},
        ],
        "10": [
            {"order_index": 1, "title": "Real Numbers", "description": "Euclid's division lemma, Fundamental Theorem of Arithmetic, irrational numbers and decimal expansions."},
            {"order_index": 2, "title": "Polynomials", "description": "Zeroes of a polynomial, relationship between zeroes and coefficients, division algorithm."},
            {"order_index": 3, "title": "Pair of Linear Equations in Two Variables", "description": "Graphical and algebraic methods — substitution, elimination, cross-multiplication."},
            {"order_index": 4, "title": "Quadratic Equations", "description": "Standard form, factorisation, completing the square, quadratic formula, discriminant."},
            {"order_index": 5, "title": "Arithmetic Progressions", "description": "nth term, sum of first n terms and applications."},
            {"order_index": 6, "title": "Triangles", "description": "Similar triangles, criteria for similarity, areas, Pythagoras theorem."},
            {"order_index": 7, "title": "Coordinate Geometry", "description": "Distance formula, section formula, area of a triangle."},
            {"order_index": 8, "title": "Introduction to Trigonometry", "description": "Trigonometric ratios, specific angles (0°, 30°, 45°, 60°, 90°) and identities."},
            {"order_index": 9, "title": "Some Applications of Trigonometry", "description": "Heights and distances using trigonometry — angles of elevation and depression."},
            {"order_index": 10, "title": "Circles", "description": "Tangent to a circle, number of tangents from an external point."},
            {"order_index": 11, "title": "Areas Related to Circles", "description": "Area and circumference, area of sector and segment."},
            {"order_index": 12, "title": "Surface Areas and Volumes", "description": "Combinations of solids, conversion of solids, frustum of a cone."},
            {"order_index": 13, "title": "Statistics", "description": "Mean, median and mode of grouped data, cumulative frequency distribution."},
            {"order_index": 14, "title": "Probability", "description": "Classical definition of probability, simple problems on single events."},
        ],
        "11": [
            {"order_index": 1, "title": "Sets", "description": "Sets, subsets, operations on sets — union, intersection, complement and Venn diagrams."},
            {"order_index": 2, "title": "Relations and Functions", "description": "Ordered pairs, Cartesian product, domain and range, types of functions."},
            {"order_index": 3, "title": "Trigonometric Functions", "description": "Radian measure, signs in quadrants, trigonometric equations and identities."},
            {"order_index": 4, "title": "Complex Numbers and Quadratic Equations", "description": "Complex number system, Argand plane, modulus, conjugate and quadratic equations."},
            {"order_index": 5, "title": "Linear Inequalities", "description": "Algebraic and graphical solutions, solution in one and two variables."},
            {"order_index": 6, "title": "Permutations and Combinations", "description": "Fundamental counting principle, factorial, permutations and combinations with applications."},
            {"order_index": 7, "title": "Binomial Theorem", "description": "Binomial theorem for positive integral index, general and middle terms."},
            {"order_index": 8, "title": "Sequences and Series", "description": "AP, GP, sum to n terms, arithmetic-geometric mean, sum of special series."},
            {"order_index": 9, "title": "Straight Lines", "description": "Slope, angle between lines, various forms of equation of a line, distance formulae."},
            {"order_index": 10, "title": "Conic Sections", "description": "Circles, parabola, ellipse, hyperbola — standard equations and properties."},
            {"order_index": 11, "title": "Introduction to Three Dimensional Geometry", "description": "Coordinate axes, planes, distance and section formulae in 3D."},
            {"order_index": 12, "title": "Limits and Derivatives", "description": "Intuitive concept of limits, algebra of limits, derivatives and rules."},
            {"order_index": 13, "title": "Statistics", "description": "Measures of dispersion — range, mean deviation, variance, standard deviation."},
            {"order_index": 14, "title": "Probability", "description": "Random experiments, events, axiomatic approach and classical probability."},
        ],
        "12": [
            {"order_index": 1, "title": "Relations and Functions", "description": "Types of relations and functions, composition, invertible functions and binary operations."},
            {"order_index": 2, "title": "Inverse Trigonometric Functions", "description": "Definition, domain-range, principal value branch, properties and graphs."},
            {"order_index": 3, "title": "Matrices", "description": "Types of matrices, operations, transpose, symmetric, elementary row operations."},
            {"order_index": 4, "title": "Determinants", "description": "Properties, cofactors, adjoint, inverse of a matrix, applications — area and system of equations."},
            {"order_index": 5, "title": "Continuity and Differentiability", "description": "Continuity, differentiability, chain rule, implicit differentiation, logarithmic and exponential functions."},
            {"order_index": 6, "title": "Application of Derivatives", "description": "Rate of change, increasing/decreasing functions, tangents, maxima and minima."},
            {"order_index": 7, "title": "Integrals", "description": "Integration as inverse of differentiation, methods — substitution, partial fractions, by parts."},
            {"order_index": 8, "title": "Application of Integrals", "description": "Area under curves and between two curves."},
            {"order_index": 9, "title": "Differential Equations", "description": "Order and degree, formation, variable separable, homogeneous, linear differential equations."},
            {"order_index": 10, "title": "Vector Algebra", "description": "Vectors, magnitude, direction, dot product, cross product and scalar triple product."},
            {"order_index": 11, "title": "Three Dimensional Geometry", "description": "Direction cosines, lines and planes in space, angle between two planes."},
            {"order_index": 12, "title": "Linear Programming", "description": "Linear programming problems, feasible region, graphical method, corner point method."},
            {"order_index": 13, "title": "Probability", "description": "Conditional probability, multiplication theorem, Bayes' theorem, random variable, Binomial distribution."},
        ],
    },
    "Physics": {
        "11": [
            {"order_index": 1, "title": "Physical World", "description": "Science and its scope, fundamental forces, nature of physical laws."},
            {"order_index": 2, "title": "Units and Measurements", "description": "SI units, significant figures, dimensional analysis and error analysis."},
            {"order_index": 3, "title": "Motion in a Straight Line", "description": "Position, displacement, velocity, acceleration, kinematic equations and graphs."},
            {"order_index": 4, "title": "Motion in a Plane", "description": "Vectors, projectile motion, uniform circular motion."},
            {"order_index": 5, "title": "Laws of Motion", "description": "Newton's laws, inertia, momentum, impulse, friction and circular motion dynamics."},
            {"order_index": 6, "title": "Work, Energy and Power", "description": "Work-energy theorem, kinetic and potential energy, conservation of energy, power."},
            {"order_index": 7, "title": "System of Particles and Rotational Motion", "description": "Centre of mass, torque, angular momentum, moment of inertia, rolling motion."},
            {"order_index": 8, "title": "Gravitation", "description": "Universal law, gravitational potential energy, escape speed, orbital velocity, satellites."},
            {"order_index": 9, "title": "Mechanical Properties of Solids", "description": "Stress-strain, elastic moduli — Young's, bulk and shear modulus."},
            {"order_index": 10, "title": "Mechanical Properties of Fluids", "description": "Pressure, Pascal's law, Archimedes' principle, viscosity, Bernoulli's equation."},
            {"order_index": 11, "title": "Thermal Properties of Matter", "description": "Heat, temperature, thermal expansion, calorimetry, heat transfer."},
            {"order_index": 12, "title": "Thermodynamics", "description": "Zeroth, first and second laws of thermodynamics, Carnot engine."},
            {"order_index": 13, "title": "Kinetic Theory", "description": "Equation of state for a perfect gas, kinetic theory, degrees of freedom, specific heats."},
            {"order_index": 14, "title": "Oscillations", "description": "SHM, energy in SHM, simple pendulum, damped and forced oscillations, resonance."},
            {"order_index": 15, "title": "Waves", "description": "Wave motion, speed of a wave, principle of superposition, standing waves, beats, Doppler effect."},
        ],
        "12": [
            {"order_index": 1, "title": "Electric Charges and Fields", "description": "Coulomb's law, electric field, Gauss's theorem and applications."},
            {"order_index": 2, "title": "Electrostatic Potential and Capacitance", "description": "Potential, equipotential surfaces, dielectrics, capacitors, energy stored."},
            {"order_index": 3, "title": "Current Electricity", "description": "Ohm's law, resistivity, Kirchhoff's laws, Wheatstone bridge, potentiometer."},
            {"order_index": 4, "title": "Moving Charges and Magnetism", "description": "Biot-Savart law, Ampere's law, cyclotron, force on current, solenoid."},
            {"order_index": 5, "title": "Magnetism and Matter", "description": "Bar magnet, Earth's magnetism, magnetic properties of materials."},
            {"order_index": 6, "title": "Electromagnetic Induction", "description": "Faraday's laws, Lenz's law, self and mutual inductance, AC generator."},
            {"order_index": 7, "title": "Alternating Current", "description": "RMS values, AC circuits with R, L, C; resonance, LC oscillations, transformers."},
            {"order_index": 8, "title": "Electromagnetic Waves", "description": "Displacement current, EM spectrum and properties."},
            {"order_index": 9, "title": "Ray Optics and Optical Instruments", "description": "Reflection, refraction, lenses, microscope, telescope, total internal reflection."},
            {"order_index": 10, "title": "Wave Optics", "description": "Huygens' principle, interference, Young's experiment, diffraction, polarisation."},
            {"order_index": 11, "title": "Dual Nature of Radiation and Matter", "description": "Photoelectric effect, de Broglie wavelength, Davisson-Germer experiment."},
            {"order_index": 12, "title": "Atoms", "description": "Alpha-particle scattering, Bohr model, hydrogen spectrum."},
            {"order_index": 13, "title": "Nuclei", "description": "Nuclear binding energy, radioactivity, nuclear fission and fusion."},
            {"order_index": 14, "title": "Semiconductor Electronics", "description": "p-n junction, diode characteristics, rectifiers, transistors, logic gates."},
        ],
    },
    "Chemistry": {
        "11": [
            {"order_index": 1, "title": "Some Basic Concepts of Chemistry", "description": "Matter, atomic and molecular masses, mole concept, stoichiometry."},
            {"order_index": 2, "title": "Structure of Atom", "description": "Bohr model, quantum numbers, orbitals, electronic configuration, aufbau principle."},
            {"order_index": 3, "title": "Classification of Elements and Periodicity", "description": "Modern periodic table, periodic trends — atomic radius, ionisation enthalpy, electronegativity."},
            {"order_index": 4, "title": "Chemical Bonding and Molecular Structure", "description": "Ionic, covalent bonds, VSEPR theory, hybridisation, molecular orbital theory."},
            {"order_index": 5, "title": "Thermodynamics", "description": "Internal energy, enthalpy, Hess's law, entropy, Gibbs free energy and spontaneity."},
            {"order_index": 6, "title": "Equilibrium", "description": "Law of chemical equilibrium, Le Chatelier's principle, ionic equilibrium, acids and bases."},
            {"order_index": 7, "title": "Redox Reactions", "description": "Oxidation number, balancing redox equations, electrochemical series."},
            {"order_index": 8, "title": "Organic Chemistry — Basic Principles", "description": "IUPAC nomenclature, isomerism, reaction mechanisms, electronic effects."},
            {"order_index": 9, "title": "Hydrocarbons", "description": "Alkanes, alkenes, alkynes and aromatic hydrocarbons — properties and reactions."},
            {"order_index": 10, "title": "s-Block Elements", "description": "Properties and reactions of Group 1 and 2 elements, uses."},
            {"order_index": 11, "title": "p-Block Elements (Group 13 & 14)", "description": "Boron, carbon, silicon — preparation, properties and compounds."},
            {"order_index": 12, "title": "Environmental Chemistry", "description": "Air and water pollution, greenhouse effect, ozone layer, acid rain."},
        ],
        "12": [
            {"order_index": 1, "title": "Solutions", "description": "Types of solutions, colligative properties, abnormal molar masses, Raoult's law."},
            {"order_index": 2, "title": "Electrochemistry", "description": "Electrochemical cells, EMF, Nernst equation, electrolysis, corrosion."},
            {"order_index": 3, "title": "Chemical Kinetics", "description": "Rate of reaction, order, molecularity, integrated rate equations, Arrhenius equation."},
            {"order_index": 4, "title": "d-Block and f-Block Elements", "description": "Transition metals — properties, oxidation states, complex compounds, lanthanoids."},
            {"order_index": 5, "title": "Coordination Compounds", "description": "IUPAC nomenclature, isomerism, valence bond theory, crystal field theory."},
            {"order_index": 6, "title": "Haloalkanes and Haloarenes", "description": "Nomenclature, preparation, properties, SN1, SN2 and elimination reactions."},
            {"order_index": 7, "title": "Alcohols, Phenols and Ethers", "description": "Nomenclature, preparation, properties and reactions."},
            {"order_index": 8, "title": "Aldehydes, Ketones and Carboxylic Acids", "description": "Nucleophilic addition, oxidation-reduction, aldol and Cannizzaro reactions."},
            {"order_index": 9, "title": "Amines", "description": "Classification, preparation, properties, basicity, diazonium salts."},
            {"order_index": 10, "title": "Biomolecules", "description": "Carbohydrates, proteins, enzymes, vitamins, nucleic acids."},
            {"order_index": 11, "title": "Polymers", "description": "Classification, addition and condensation polymers, rubber, commercial polymers."},
            {"order_index": 12, "title": "Chemistry in Everyday Life", "description": "Drugs, dyes, detergents, rocket propellants and food chemicals."},
        ],
    },
    "Biology": {
        "11": [
            {"order_index": 1, "title": "The Living World", "description": "Characteristics of living organisms, taxonomy, species concept and nomenclature."},
            {"order_index": 2, "title": "Biological Classification", "description": "Five-kingdom classification — Monera, Protista, Fungi, Plantae, Animalia."},
            {"order_index": 3, "title": "Plant Kingdom", "description": "Algae, bryophytes, pteridophytes, gymnosperms, angiosperms — classification and life cycles."},
            {"order_index": 4, "title": "Animal Kingdom", "description": "Basis of classification, non-chordates and chordates — phyla and examples."},
            {"order_index": 5, "title": "Morphology of Flowering Plants", "description": "Root, stem, leaf, flower, fruit, seed — morphology and modifications."},
            {"order_index": 6, "title": "Anatomy of Flowering Plants", "description": "Tissue systems — meristematic, permanent; secondary growth."},
            {"order_index": 7, "title": "Structural Organisation in Animals", "description": "Tissues, organs, organ systems in animals; earthworm, cockroach, frog."},
            {"order_index": 8, "title": "Cell: The Unit of Life", "description": "Cell theory, prokaryotic and eukaryotic cells, cell organelles and their functions."},
            {"order_index": 9, "title": "Biomolecules", "description": "Proteins, lipids, carbohydrates, nucleic acids — structure and function."},
            {"order_index": 10, "title": "Cell Cycle and Cell Division", "description": "Cell cycle, mitosis and meiosis — stages and significance."},
            {"order_index": 11, "title": "Transport in Plants", "description": "Diffusion, osmosis, water potential, transpiration, phloem transport."},
            {"order_index": 12, "title": "Mineral Nutrition", "description": "Essential mineral elements, deficiency symptoms, nitrogen fixation."},
            {"order_index": 13, "title": "Photosynthesis in Higher Plants", "description": "Light reactions, Calvin cycle, C4 pathway, photorespiration."},
            {"order_index": 14, "title": "Respiration in Plants", "description": "Glycolysis, Krebs cycle, electron transport chain, fermentation."},
            {"order_index": 15, "title": "Plant Growth and Development", "description": "Growth phases, plant hormones, photoperiodism, vernalisation."},
            {"order_index": 16, "title": "Digestion and Absorption", "description": "Human digestive system, digestion of carbohydrates, proteins and fats."},
            {"order_index": 17, "title": "Breathing and Exchange of Gases", "description": "Respiratory organs, mechanism of breathing, transport of gases, disorders."},
            {"order_index": 18, "title": "Body Fluids and Circulation", "description": "Blood, lymph, human heart, cardiac cycle, ECG, disorders."},
        ],
        "12": [
            {"order_index": 1, "title": "Reproduction in Organisms", "description": "Asexual and sexual reproduction, life spans and reproductive events."},
            {"order_index": 2, "title": "Sexual Reproduction in Flowering Plants", "description": "Flower structure, pollination, fertilisation, seed and fruit formation."},
            {"order_index": 3, "title": "Human Reproduction", "description": "Male and female reproductive systems, gametogenesis, fertilisation, embryonic development."},
            {"order_index": 4, "title": "Reproductive Health", "description": "Population growth, contraception, STDs, MTP, infertility."},
            {"order_index": 5, "title": "Principles of Inheritance and Variation", "description": "Mendel's laws, chromosomal theory, linkage, sex determination, genetic disorders."},
            {"order_index": 6, "title": "Molecular Basis of Inheritance", "description": "DNA structure and replication, transcription, translation, genetic code, regulation."},
            {"order_index": 7, "title": "Evolution", "description": "Origin of life, theories of evolution, natural selection, speciation, human evolution."},
            {"order_index": 8, "title": "Human Health and Disease", "description": "Pathogens, immune system, AIDS, cancer, drugs and alcohol abuse."},
            {"order_index": 9, "title": "Strategies for Enhancement in Food Production", "description": "Plant and animal breeding, tissue culture, biofortification."},
            {"order_index": 10, "title": "Microbes in Human Welfare", "description": "Microbes in food, industrial products, sewage treatment, biogas, biocontrol."},
            {"order_index": 11, "title": "Biotechnology: Principles and Processes", "description": "Recombinant DNA technology, PCR, gel electrophoresis, cloning vectors."},
            {"order_index": 12, "title": "Biotechnology and its Applications", "description": "GM crops, insulin, gene therapy, molecular diagnostics, ethical issues."},
            {"order_index": 13, "title": "Organisms and Populations", "description": "Habitat, niche, population interactions, growth models."},
            {"order_index": 14, "title": "Ecosystem", "description": "Components, productivity, energy flow, nutrient cycling, succession."},
            {"order_index": 15, "title": "Biodiversity and Conservation", "description": "Biodiversity patterns, loss of biodiversity, in-situ and ex-situ conservation."},
            {"order_index": 16, "title": "Environmental Issues", "description": "Pollution types, ozone depletion, deforestation, case studies."},
        ],
    },
    "History": {
        "9": [
            {"order_index": 1, "title": "The French Revolution", "description": "Causes, events of 1789, phases of the Revolution, Napoleon and the legacy."},
            {"order_index": 2, "title": "Socialism in Europe and the Russian Revolution", "description": "Industrial society, socialist ideas, 1905 and 1917 revolutions, Bolsheviks, Stalin."},
            {"order_index": 3, "title": "Nazism and the Rise of Hitler", "description": "Weimar Republic, rise of Hitler, Nazi ideology, World War II and the Holocaust."},
            {"order_index": 4, "title": "Forest Society and Colonialism", "description": "Deforestation, colonial forest policies, forest communities and resistance."},
            {"order_index": 5, "title": "Pastoralists in the Modern World", "description": "Nomadic communities, colonial policies and pastoral societies across the world."},
        ],
        "10": [
            {"order_index": 1, "title": "The Rise of Nationalism in Europe", "description": "French Revolution, Napoleonic Code, nationalism and the creation of nation-states."},
            {"order_index": 2, "title": "Nationalism in India", "description": "Non-Cooperation Movement, Civil Disobedience Movement, INC and the path to Independence."},
            {"order_index": 3, "title": "The Making of a Global World", "description": "Silk Routes, colonial trade, inter-war economy, Great Depression, Bretton Woods."},
            {"order_index": 4, "title": "The Age of Industrialisation", "description": "Proto-industrialisation, British Industrial Revolution, factories, industry in India."},
            {"order_index": 5, "title": "Print Culture and the Modern World", "description": "Gutenberg press, print and nationalism, reading publics, print and the poor."},
        ],
    },
    "Geography": {
        "9": [
            {"order_index": 1, "title": "India — Size and Location", "description": "India's location, neighbours, the Standard Meridian and time zones."},
            {"order_index": 2, "title": "Physical Features of India", "description": "Himalayan mountains, peninsular plateau, coastal plains and island groups."},
            {"order_index": 3, "title": "Drainage", "description": "River systems — Himalayan and Peninsular rivers, drainage patterns, lakes."},
            {"order_index": 4, "title": "Climate", "description": "Factors affecting climate, monsoon, seasons, distribution of rainfall."},
            {"order_index": 5, "title": "Natural Vegetation and Wildlife", "description": "Types of vegetation, wildlife, conservation — biosphere reserves and national parks."},
            {"order_index": 6, "title": "Population", "description": "Population distribution, density, growth, composition, migration, literacy."},
        ],
    },
    "English": {
        "9": [
            {"order_index": 1, "title": "Grammar: Tenses and Sentence Types", "description": "All tenses, sentence transformation, active and passive voice."},
            {"order_index": 2, "title": "Writing: Formal Letter and Notice", "description": "Format, language and content of formal letters and notices."},
            {"order_index": 3, "title": "Prose: The Fun They Had & The Sound of Music", "description": "Reading comprehension, character study and themes in the prose chapters."},
            {"order_index": 4, "title": "Poetry: The Road Not Taken & Wind", "description": "Poetic devices, theme, imagery and appreciation."},
            {"order_index": 5, "title": "Grammar: Determiners, Prepositions, Conjunctions", "description": "Usage, exercises and gap-fills."},
            {"order_index": 6, "title": "Writing: Descriptive Paragraph and Story", "description": "Techniques of descriptive writing and story writing with examples."},
            {"order_index": 7, "title": "Prose: The Little Girl & A Truly Beautiful Mind", "description": "Comprehension, inferences and vocabulary."},
            {"order_index": 8, "title": "Long Reading Text: Diary of a Young Girl", "description": "Summary, character sketch, thematic analysis of Anne Frank's diary."},
        ],
        "10": [
            {"order_index": 1, "title": "Grammar: Reported Speech and Modals", "description": "Direct to indirect speech, modals and their usage."},
            {"order_index": 2, "title": "Writing: Article, Report and Speech", "description": "Formats, language, structure and practice for articles and reports."},
            {"order_index": 3, "title": "First Flight: A Letter to God & Nelson Mandela", "description": "Comprehension, values, vocabulary from the two prose chapters."},
            {"order_index": 4, "title": "Poetry: Dust of Snow & Fire and Ice", "description": "Interpretation, poetic devices and appreciation."},
            {"order_index": 5, "title": "Prose: Two Stories About Flying & From the Diary of Anne Frank", "description": "Comprehension and character analysis."},
            {"order_index": 6, "title": "Grammar: Subject-Verb Agreement and Editing", "description": "Common errors, editing exercises and proofreading."},
            {"order_index": 7, "title": "The Diary of a Young Girl — Extended Reading", "description": "Full novel analysis, timeline, themes of war and hope."},
        ],
    },
    "Computer Science": {
        "11": [
            {"order_index": 1, "title": "Computer Systems Overview", "description": "Hardware, software, memory hierarchy, I/O devices and number systems."},
            {"order_index": 2, "title": "Getting Started with Python", "description": "Introduction to Python, IDLE, variables, data types, input/output."},
            {"order_index": 3, "title": "Python Fundamentals", "description": "Operators, expressions, type conversion, comments and coding style."},
            {"order_index": 4, "title": "Flow of Control", "description": "if-elif-else, while loop, for loop with range, break, continue, pass."},
            {"order_index": 5, "title": "Strings", "description": "String operations, slicing, built-in string methods and formatting."},
            {"order_index": 6, "title": "Lists", "description": "List creation, indexing, slicing, methods and list comprehension."},
            {"order_index": 7, "title": "Tuples and Dictionaries", "description": "Tuple operations, dictionary creation, methods and nested structures."},
            {"order_index": 8, "title": "Functions", "description": "Defining functions, scope, arguments, return values, recursion."},
            {"order_index": 9, "title": "File Handling", "description": "Text and binary files, opening, reading, writing and closing files."},
            {"order_index": 10, "title": "Societal Impacts of Computing", "description": "Digital footprint, net etiquette, cybercrime, privacy and intellectual property."},
        ],
        "12": [
            {"order_index": 1, "title": "Review of Python", "description": "Revision of class 11 concepts — data types, control structures, functions."},
            {"order_index": 2, "title": "Exception and File Handling", "description": "Exception handling with try-except, file operations and CSV file handling."},
            {"order_index": 3, "title": "Data Structures: Stack", "description": "Stack concept, push and pop using Python lists, applications."},
            {"order_index": 4, "title": "Computer Networks", "description": "Network types, topologies, protocols, TCP/IP model, HTTP, DNS, security."},
            {"order_index": 5, "title": "Database Concepts", "description": "DBMS, relational model, keys, SQL — DDL and DML commands."},
            {"order_index": 6, "title": "SQL — Advanced Queries", "description": "Aggregate functions, GROUP BY, ORDER BY, joins and subqueries."},
            {"order_index": 7, "title": "Python-MySQL Connectivity", "description": "Connecting Python to MySQL, executing queries from Python."},
            {"order_index": 8, "title": "Societal and Ethical Issues", "description": "Intellectual property, open source, plagiarism, gender and disability issues."},
        ],
    },
    "Economics": {
        "11": [
            {"order_index": 1, "title": "Introduction to Economics", "description": "What is Economics, microeconomics vs macroeconomics, central problems."},
            {"order_index": 2, "title": "Consumer's Equilibrium and Demand", "description": "Utility theory, budget constraint, demand law, elasticity of demand."},
            {"order_index": 3, "title": "Producer Behaviour and Supply", "description": "Production function, costs, revenue, supply law and elasticity."},
            {"order_index": 4, "title": "Forms of Market and Price Determination", "description": "Perfect competition, monopoly, oligopoly — equilibrium price and quantity."},
            {"order_index": 5, "title": "Statistics for Economics", "description": "Collection and organisation of data, measures of central tendency and dispersion."},
            {"order_index": 6, "title": "Indian Economic Development", "description": "Goals of five-year plans, poverty, human capital, rural and environment issues."},
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# ICSE  (Council for the Indian School Certificate Examinations)
# ─────────────────────────────────────────────────────────────────────────────
ICSE: dict[str, dict[str, list[ChapterDef]]] = {
    "Mathematics": {
        "9": [
            {"order_index": 1, "title": "Pure Arithmetic: Rational and Irrational Numbers", "description": "Rational numbers, irrational numbers, real number line and operations."},
            {"order_index": 2, "title": "Commercial Mathematics", "description": "Profit and loss, GST, compound interest and instalments."},
            {"order_index": 3, "title": "Algebra: Expansions and Factorisation", "description": "Algebraic identities, factorisation by regrouping and identities."},
            {"order_index": 4, "title": "Simultaneous Equations", "description": "Solving pairs of linear equations — graphical and algebraic methods."},
            {"order_index": 5, "title": "Indices (Exponents)", "description": "Laws of indices, scientific notation."},
            {"order_index": 6, "title": "Logarithms", "description": "Laws of logarithms, change of base and applications."},
            {"order_index": 7, "title": "Geometry: Triangles", "description": "Congruence theorems, isosceles triangle properties, concurrent lines."},
            {"order_index": 8, "title": "Rectilinear Figures", "description": "Properties of quadrilaterals, mid-point theorem, constructions."},
            {"order_index": 9, "title": "Circle", "description": "Chord properties, arc and angle relationships."},
            {"order_index": 10, "title": "Statistics", "description": "Frequency distributions, mean, median, mode, histograms and ogives."},
            {"order_index": 11, "title": "Mensuration", "description": "Area of plane figures, surface area and volume of solids."},
            {"order_index": 12, "title": "Trigonometry", "description": "Trigonometric ratios, identities, complementary angles."},
            {"order_index": 13, "title": "Coordinate Geometry", "description": "Cartesian plane, section formula, slope, equation of a line."},
        ],
        "10": [
            {"order_index": 1, "title": "Commercial Mathematics: GST & Banking", "description": "Goods and Services Tax calculations, banking instruments, shares and dividends."},
            {"order_index": 2, "title": "Algebra: Linear Inequations", "description": "Solving and graphing linear inequations in one variable on a number line."},
            {"order_index": 3, "title": "Quadratic Equations", "description": "Solving by factorisation and formula, nature of roots, word problems."},
            {"order_index": 4, "title": "Ratio and Proportion", "description": "Proportion, componendo-dividendo, continued proportion."},
            {"order_index": 5, "title": "Factorisation of Polynomials", "description": "Remainder theorem, factor theorem, factorising cubic expressions."},
            {"order_index": 6, "title": "Matrices", "description": "Order of matrices, operations — addition, subtraction and multiplication."},
            {"order_index": 7, "title": "Arithmetic and Geometric Progressions", "description": "nth term and sum of AP and GP, combined problems."},
            {"order_index": 8, "title": "Coordinate Geometry: Reflection", "description": "Reflection in axes, line x=a, y=b, invariant points."},
            {"order_index": 9, "title": "Section and Midpoint Formula", "description": "Internal division, midpoint, centroid of triangle."},
            {"order_index": 10, "title": "Equation of a Line", "description": "Slope-intercept, two-point, intercept form; conditions for parallel and perpendicular."},
            {"order_index": 11, "title": "Similarity (Including Loci)", "description": "Similar triangles, areas, Pythagoras theorem, loci constructions."},
            {"order_index": 12, "title": "Circles: Angle and Tangent Properties", "description": "Angles in circles, tangent-secant relationships, alternate segment theorem."},
            {"order_index": 13, "title": "Constructions", "description": "Circumscribing and inscribing circles, circumcentre and incentre."},
            {"order_index": 14, "title": "Mensuration: Cylinder, Cone, Sphere", "description": "Surface area and volume, mixed problems."},
            {"order_index": 15, "title": "Trigonometry: Heights and Distances", "description": "Angles of elevation and depression, practical problems."},
            {"order_index": 16, "title": "Statistics: Measures of Central Tendency", "description": "Mean by step-deviation, median by ogive, quartiles, inter-quartile range."},
            {"order_index": 17, "title": "Probability", "description": "Empirical probability, random experiments, complementary events."},
        ],
    },
    "Physics": {
        "9": [
            {"order_index": 1, "title": "Measurements and Experimentation", "description": "SI units, significant figures, vernier callipers, screw gauge, simple pendulum."},
            {"order_index": 2, "title": "Motion in One Dimension", "description": "Scalar and vector quantities, equations of motion, distance-time and velocity-time graphs."},
            {"order_index": 3, "title": "Laws of Motion", "description": "Newton's laws, momentum, impulse, gravitation, weight and mass."},
            {"order_index": 4, "title": "Pressure in Fluids and Atmospheric Pressure", "description": "Thrust and pressure, Pascal's law, barometer, manometer."},
            {"order_index": 5, "title": "Upthrust in Fluids — Archimedes' Principle", "description": "Buoyancy, conditions of floating, law of flotation."},
            {"order_index": 6, "title": "Heat and Energy", "description": "Heat and temperature, calorimetry, specific heat, latent heat."},
            {"order_index": 7, "title": "Reflection of Light", "description": "Laws of reflection, mirrors — plane and spherical, mirror formula."},
            {"order_index": 8, "title": "Propagation of Sound Waves", "description": "Nature of sound, speed, echo, SONAR."},
            {"order_index": 9, "title": "Current Electricity", "description": "Electric current, potential difference, Ohm's law, resistance, series and parallel circuits."},
        ],
    },
    "Chemistry": {
        "9": [
            {"order_index": 1, "title": "The Language of Chemistry", "description": "Symbols, formulae, valency, chemical equations and balancing."},
            {"order_index": 2, "title": "Chemical Changes and Reactions", "description": "Types of reactions — combination, decomposition, displacement, double decomposition."},
            {"order_index": 3, "title": "Water", "description": "Composition of water, hard and soft water, treatment."},
            {"order_index": 4, "title": "Atomic Structure and Chemical Bonding", "description": "Subatomic particles, electronic configuration, ionic and covalent bonding."},
            {"order_index": 5, "title": "The Periodic Table", "description": "Modern periodic law, periods and groups, trends."},
            {"order_index": 6, "title": "Study of the First Element — Hydrogen", "description": "Position in periodic table, preparation, properties and uses."},
            {"order_index": 7, "title": "Study of Gas Laws", "description": "Boyle's law, Charles' law, combined gas law, Avogadro's law."},
            {"order_index": 8, "title": "Atmospheric Pollution", "description": "Air and water pollution, acid rain, greenhouse effect."},
        ],
    },
    "Biology": {
        "9": [
            {"order_index": 1, "title": "Basic Biology", "description": "Cell structure, prokaryotic vs eukaryotic, cell organelles, cell division."},
            {"order_index": 2, "title": "Plant Physiology", "description": "Photosynthesis, respiration, transpiration, absorption of water and minerals."},
            {"order_index": 3, "title": "Diversity of Life", "description": "Classification of organisms, five-kingdom classification, viruses."},
            {"order_index": 4, "title": "Human Anatomy and Physiology", "description": "Digestive, circulatory, excretory and nervous systems."},
            {"order_index": 5, "title": "Health and Hygiene", "description": "Infectious diseases, immunity, vaccination, first aid."},
            {"order_index": 6, "title": "Waste Generation and Management", "description": "Types of waste, biodegradable vs non-biodegradable, waste disposal methods."},
        ],
    },
    "Computer Science": {
        "9": [
            {"order_index": 1, "title": "Introduction to Object Oriented Programming", "description": "OOP concepts — class, object, encapsulation, inheritance, polymorphism."},
            {"order_index": 2, "title": "Elementary Concepts of Objects and Classes", "description": "Defining classes in Java, fields, methods, constructors."},
            {"order_index": 3, "title": "Values and Data Types", "description": "Primitive and non-primitive data types, literals, variables."},
            {"order_index": 4, "title": "Operators in Java", "description": "Arithmetic, relational, logical, bitwise, assignment, conditional operators."},
            {"order_index": 5, "title": "Input in Java", "description": "Scanner class, BufferedReader, input and output in Java programs."},
            {"order_index": 6, "title": "Control Flow Statements", "description": "if-else, switch-case, while, do-while, for loops in Java."},
            {"order_index": 7, "title": "Arrays", "description": "Single and double dimensional arrays, traversal, searching and sorting."},
            {"order_index": 8, "title": "String Handling", "description": "String class methods, character operations, StringBuffer."},
        ],
    },
    "History & Civics": {
        "9": [
            {"order_index": 1, "title": "The Harappan Civilisation", "description": "Discovery, town planning, economy, religion and decline."},
            {"order_index": 2, "title": "The Vedic Period", "description": "Early and later Vedic period, society, economy and religious beliefs."},
            {"order_index": 3, "title": "Jainism and Buddhism", "description": "Causes for rise, teachings, spread and decline."},
            {"order_index": 4, "title": "The Mauryan Empire", "description": "Chandragupta Maurya, Ashoka, administration, Dhamma and decline."},
            {"order_index": 5, "title": "The Gupta Empire", "description": "Political history, administration, science, art and literature."},
            {"order_index": 6, "title": "The Constitution of India", "description": "Making of the Constitution, Preamble, fundamental rights and duties."},
            {"order_index": 7, "title": "Fundamental Rights and Directive Principles", "description": "Classification of rights, DPSP, relationship between rights and directives."},
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# Cambridge IGCSE  (for Grade 9–10 / O-Level equivalent)
# ─────────────────────────────────────────────────────────────────────────────
CAMBRIDGE: dict[str, dict[str, list[ChapterDef]]] = {
    "Mathematics": {
        "9": [
            {"order_index": 1, "title": "Number: Properties and Calculations", "description": "Sets, natural numbers, HCF/LCM, fractions, percentages, ratio, standard form."},
            {"order_index": 2, "title": "Algebra: Expressions and Formulae", "description": "Algebraic manipulation, indices, substitution and factorisation."},
            {"order_index": 3, "title": "Algebra: Equations and Inequalities", "description": "Linear and quadratic equations, inequalities, simultaneous equations."},
            {"order_index": 4, "title": "Coordinate Geometry and Graphs", "description": "Straight lines, gradient, y-intercept, equations, distance and midpoint."},
            {"order_index": 5, "title": "Geometry: Lines, Angles and Polygons", "description": "Angle properties, parallel lines, polygons, constructions."},
            {"order_index": 6, "title": "Mensuration", "description": "Area and perimeter of 2D shapes, surface area and volume of 3D solids."},
            {"order_index": 7, "title": "Trigonometry", "description": "Right-angled triangles, sine rule, cosine rule, bearings."},
            {"order_index": 8, "title": "Transformations", "description": "Reflection, rotation, enlargement, translation and combined transformations."},
            {"order_index": 9, "title": "Vectors", "description": "Vector notation, addition, subtraction, magnitude, column vectors."},
            {"order_index": 10, "title": "Statistics and Probability", "description": "Data collection, averages, charts, probability — single and combined events."},
        ],
    },
    "Physics": {
        "9": [
            {"order_index": 1, "title": "Measurements", "description": "SI units, scalars and vectors, measuring instruments, significant figures."},
            {"order_index": 2, "title": "Motion", "description": "Speed, velocity, acceleration, distance-time and velocity-time graphs, equations of motion."},
            {"order_index": 3, "title": "Forces", "description": "Newton's laws, mass and weight, friction, turning effect, pressure."},
            {"order_index": 4, "title": "Energy, Work and Power", "description": "Forms of energy, conservation, work-energy theorem, power and efficiency."},
            {"order_index": 5, "title": "Thermal Physics", "description": "Kinetic model, thermal expansion, temperature scales, heat transfer."},
            {"order_index": 6, "title": "Waves", "description": "Properties of waves, electromagnetic spectrum, sound, light — reflection and refraction."},
            {"order_index": 7, "title": "Electricity and Magnetism", "description": "Electric circuits, Ohm's law, series/parallel circuits, magnets and electromagnets."},
            {"order_index": 8, "title": "Nuclear Physics", "description": "Atomic structure, radioactivity, alpha, beta, gamma radiation, half-life."},
        ],
    },
    "Chemistry": {
        "9": [
            {"order_index": 1, "title": "States of Matter", "description": "Solid, liquid and gas — kinetic theory, changes of state, diffusion."},
            {"order_index": 2, "title": "Atomic Structure", "description": "Sub-atomic particles, electronic structure, isotopes."},
            {"order_index": 3, "title": "Chemical Bonding", "description": "Ionic, covalent and metallic bonds, structure and properties."},
            {"order_index": 4, "title": "Stoichiometry", "description": "Mole concept, empirical and molecular formulae, chemical equations."},
            {"order_index": 5, "title": "Electrochemistry", "description": "Electrolysis, electrode products, electroplating."},
            {"order_index": 6, "title": "Energetics", "description": "Exothermic and endothermic reactions, bond energies, energy level diagrams."},
            {"order_index": 7, "title": "Chemical Kinetics", "description": "Rates of reaction, factors affecting rate, activation energy."},
            {"order_index": 8, "title": "Acids, Bases and Salts", "description": "Properties, pH scale, neutralisation, preparation of salts."},
            {"order_index": 9, "title": "The Periodic Table", "description": "Groups and periods, Group 1, 7 and 0, transition metals."},
            {"order_index": 10, "title": "Organic Chemistry", "description": "Hydrocarbons, alkanes, alkenes, alcohols, carboxylic acids, polymers."},
        ],
    },
    "Computer Science": {
        "9": [
            {"order_index": 1, "title": "Data Representation", "description": "Binary, denary, hexadecimal — conversion and arithmetic. ASCII, images, sound."},
            {"order_index": 2, "title": "Data Transmission", "description": "Serial vs parallel, methods of transmission, error detection — parity, checksum."},
            {"order_index": 3, "title": "Hardware", "description": "CPU components — ALU, CU, registers, cache. Input/output and storage devices."},
            {"order_index": 4, "title": "Software and Development", "description": "System and application software, programming languages, translators."},
            {"order_index": 5, "title": "Internet and Security", "description": "Internet structure, protocols, cybersecurity threats and measures."},
            {"order_index": 6, "title": "Algorithm Design", "description": "Pseudocode, flowcharts, sequence, selection, iteration."},
            {"order_index": 7, "title": "Programming Concepts", "description": "Variables, data types, input/output, arithmetic and logic operators."},
            {"order_index": 8, "title": "Arrays and Subroutines", "description": "1D and 2D arrays, procedures and functions, scope of variables."},
            {"order_index": 9, "title": "Database and SQL", "description": "Relational databases, primary keys, SQL SELECT, WHERE, JOIN."},
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# IB (International Baccalaureate — MYP for 9-10, DP for 11-12)
# ─────────────────────────────────────────────────────────────────────────────
IB: dict[str, dict[str, list[ChapterDef]]] = {
    "Mathematics": {
        "11": [
            {"order_index": 1, "title": "Number and Algebra", "description": "Sequences and series, binomial theorem, complex numbers, proof by induction."},
            {"order_index": 2, "title": "Functions", "description": "Function types, inverses, transformations, rational functions."},
            {"order_index": 3, "title": "Geometry and Trigonometry", "description": "3D geometry, trigonometric identities, compound angles, applications."},
            {"order_index": 4, "title": "Statistics and Probability", "description": "Descriptive statistics, probability distributions — binomial and normal."},
            {"order_index": 5, "title": "Calculus", "description": "Limits, differentiation, integration — techniques and applications."},
            {"order_index": 6, "title": "Mathematical Exploration (IA)", "description": "Independent investigation applying mathematical concepts."},
        ],
    },
    "Physics": {
        "11": [
            {"order_index": 1, "title": "Measurements and Uncertainties", "description": "SI units, significant figures, uncertainties, graphical analysis."},
            {"order_index": 2, "title": "Mechanics", "description": "Kinematics, Newton's laws, work-energy theorem, momentum, circular motion."},
            {"order_index": 3, "title": "Thermal Physics", "description": "Thermodynamics, kinetic model of an ideal gas, thermal energy transfer."},
            {"order_index": 4, "title": "Waves", "description": "Oscillations, wave properties, standing waves, resonance, Doppler effect."},
            {"order_index": 5, "title": "Electricity and Magnetism", "description": "Electric fields, circuits, magnetic fields, electromagnetic induction."},
            {"order_index": 6, "title": "Circular Motion and Gravitation", "description": "Angular velocity, centripetal force, Newton's law of gravitation, orbits."},
            {"order_index": 7, "title": "Atomic, Nuclear and Particle Physics", "description": "Atomic models, radioactivity, nuclear reactions, particle physics."},
            {"order_index": 8, "title": "Energy Production", "description": "Energy sources, electricity generation, renewables, greenhouse effect."},
        ],
    },
    "Chemistry": {
        "11": [
            {"order_index": 1, "title": "Stoichiometric Relationships", "description": "Mole concept, empirical formulae, gas laws, Avogadro's law, solutions."},
            {"order_index": 2, "title": "Atomic Structure", "description": "Emission spectra, quantum model, electron configurations, ionisation energies."},
            {"order_index": 3, "title": "Periodicity", "description": "Periodic trends, physical and chemical properties across periods and groups."},
            {"order_index": 4, "title": "Chemical Bonding", "description": "Ionic, covalent, metallic; VSEPR, molecular polarity, intermolecular forces."},
            {"order_index": 5, "title": "Energetics/Thermochemistry", "description": "Enthalpy, Hess's law, bond enthalpies, Born-Haber cycles."},
            {"order_index": 6, "title": "Chemical Kinetics", "description": "Rates, factors, mechanisms, activation energy and the Arrhenius equation."},
            {"order_index": 7, "title": "Equilibrium", "description": "Equilibrium law, Kc, Le Chatelier's principle, solubility equilibria."},
            {"order_index": 8, "title": "Acids and Bases", "description": "Brønsted-Lowry theory, Ka, Kb, pH, buffers, titration curves."},
            {"order_index": 9, "title": "Redox Processes", "description": "Oxidation states, electrochemical cells, standard electrode potentials."},
            {"order_index": 10, "title": "Organic Chemistry", "description": "Functional groups, reaction mechanisms, stereoisomerism."},
        ],
    },
    "Computer Science": {
        "11": [
            {"order_index": 1, "title": "System Fundamentals", "description": "Systems thinking, design, implementation, evaluation and project management."},
            {"order_index": 2, "title": "Computer Organisation", "description": "CPU, memory, storage, binary representation, logic gates."},
            {"order_index": 3, "title": "Networks", "description": "Network fundamentals, protocols, security, distributed computing."},
            {"order_index": 4, "title": "Computational Thinking and Problem Solving", "description": "Algorithms, pseudocode, flowcharts, searching and sorting."},
            {"order_index": 5, "title": "Object-Oriented Programming", "description": "Classes, objects, inheritance, polymorphism, UML."},
            {"order_index": 6, "title": "Abstract Data Structures", "description": "Stacks, queues, linked lists, trees, recursion."},
            {"order_index": 7, "title": "Resource Management", "description": "OS functions, scheduling, memory management, concurrency."},
            {"order_index": 8, "title": "Control and Case Study", "description": "Control systems, autonomous agents and the annual HL case study."},
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# Common Core (US — representative grades 6-8 and high school)
# ─────────────────────────────────────────────────────────────────────────────
COMMON_CORE: dict[str, dict[str, list[ChapterDef]]] = {
    "Mathematics": {
        "6": [
            {"order_index": 1, "title": "Ratios and Proportional Relationships", "description": "Understanding ratio and rate, unit rate, ratio tables and graphs."},
            {"order_index": 2, "title": "The Number System", "description": "Dividing fractions, multi-digit arithmetic, rational numbers and the number line."},
            {"order_index": 3, "title": "Expressions and Equations", "description": "Writing and evaluating algebraic expressions, one-variable equations and inequalities."},
            {"order_index": 4, "title": "Geometry", "description": "Area of triangles and polygons, surface area and volume, coordinate plane."},
            {"order_index": 5, "title": "Statistics and Probability", "description": "Statistical questions, dot plots, histograms, box plots, mean and MAD."},
        ],
        "8": [
            {"order_index": 1, "title": "The Number System and Exponents", "description": "Integer exponents, square and cube roots, scientific notation."},
            {"order_index": 2, "title": "Expressions and Equations: Linear", "description": "Proportional and non-proportional linear relationships, slope-intercept form."},
            {"order_index": 3, "title": "Functions", "description": "Defining functions, comparing linear functions, non-linear functions."},
            {"order_index": 4, "title": "Systems of Linear Equations", "description": "Solving systems graphically and algebraically, infinitely many or no solutions."},
            {"order_index": 5, "title": "Geometry: Transformations", "description": "Rotations, reflections, translations, congruence and dilations/similarity."},
            {"order_index": 6, "title": "Pythagorean Theorem", "description": "Proof, applications in 2D and 3D, distance in the coordinate plane."},
            {"order_index": 7, "title": "Statistics and Probability", "description": "Scatter plots, lines of best fit, linear models and two-way tables."},
        ],
        "9": [
            {"order_index": 1, "title": "Algebra 1: Relationships Between Quantities", "description": "Interpreting expressions and equations, units, constructing models."},
            {"order_index": 2, "title": "Linear and Exponential Relationships", "description": "Solving linear equations and inequalities, linear functions, exponential models."},
            {"order_index": 3, "title": "Descriptive Statistics", "description": "Representing data, interpreting shape, centre and spread, correlation."},
            {"order_index": 4, "title": "Expressions and Equations", "description": "Rewriting expressions, quadratic equations, factorisation, quadratic formula."},
            {"order_index": 5, "title": "Quadratic Functions and Modelling", "description": "Graphing parabolas, comparing linear, quadratic and exponential models."},
        ],
    },
    "Physics": {
        "9": [
            {"order_index": 1, "title": "Motion and Forces", "description": "Newton's laws, kinematics, free body diagrams, projectile motion."},
            {"order_index": 2, "title": "Energy", "description": "Types of energy, conservation of energy, power and work."},
            {"order_index": 3, "title": "Waves and Their Applications", "description": "Mechanical and electromagnetic waves, optics, wave behaviour."},
            {"order_index": 4, "title": "Electricity and Magnetism", "description": "Charge, fields, current, circuits, electromagnetic induction."},
            {"order_index": 5, "title": "Thermodynamics", "description": "Temperature, heat, thermodynamic systems, thermal energy transfer."},
        ],
    },
    "Chemistry": {
        "9": [
            {"order_index": 1, "title": "Structure and Properties of Matter", "description": "Atomic structure, electron configuration, periodic trends."},
            {"order_index": 2, "title": "Chemical Reactions", "description": "Types of reactions, conservation of mass, stoichiometry."},
            {"order_index": 3, "title": "Forces and Interactions at Molecular Level", "description": "Intermolecular forces, solutions, colligative properties."},
            {"order_index": 4, "title": "Energy in Chemical Processes", "description": "Exothermic, endothermic, activation energy, catalysis."},
            {"order_index": 5, "title": "Biogeochemical Cycles", "description": "Carbon, nitrogen, water cycles and their impact on Earth systems."},
        ],
    },
    "Computer Science": {
        "9": [
            {"order_index": 1, "title": "Impacts of Computing", "description": "Digital divide, privacy, surveillance, intellectual property, accessibility."},
            {"order_index": 2, "title": "Networks and the Internet", "description": "Packet switching, protocols, DNS, HTTP, cybersecurity."},
            {"order_index": 3, "title": "Data and Analysis", "description": "Binary, compression, data encoding, visualisation and analysis."},
            {"order_index": 4, "title": "Algorithms", "description": "Pseudocode, efficiency, searching, sorting, abstraction."},
            {"order_index": 5, "title": "Programming", "description": "Variables, conditionals, loops, functions, debugging in Python."},
            {"order_index": 6, "title": "The Design Process", "description": "Problem definition, testing, iterative design and documentation."},
        ],
    },
}

# ─────────────────────────────────────────────────────────────────────────────
# Lookup helper
# ─────────────────────────────────────────────────────────────────────────────

BOARD_MAP = {
    "CBSE": CBSE,
    "ICSE": ICSE,
    "Cambridge IGCSE": CAMBRIDGE,
    "IB": IB,
    "Common Core": COMMON_CORE,
}

SUPPORTED_BOARDS = list(BOARD_MAP.keys())


def get_syllabus(board: str, subject: str, grade: str) -> list[ChapterDef] | None:
    """Return the chapter list for board+subject+grade, or None if not found."""
    board_data = BOARD_MAP.get(board)
    if not board_data:
        return None
    subject_data = board_data.get(subject)
    if not subject_data:
        # Try case-insensitive match
        for key in board_data:
            if key.lower() == subject.lower():
                subject_data = board_data[key]
                break
    if not subject_data:
        return None
    return subject_data.get(grade)


def get_supported_subjects(board: str) -> list[str]:
    """Return subjects available for a board."""
    board_data = BOARD_MAP.get(board, {})
    return list(board_data.keys())


def get_supported_grades(board: str, subject: str) -> list[str]:
    """Return grades available for a board+subject."""
    board_data = BOARD_MAP.get(board, {})
    subject_data = board_data.get(subject, {})
    return list(subject_data.keys())
