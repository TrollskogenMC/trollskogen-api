import yaml from "js-yaml";

/* eslint-disable no-useless-escape */
const verifyData = `
28	efa74dc2-122d-48ca-bc64-2e32188d62de	CatSpaceTravel	t	\N	153543809286930433	\N	2019-05-11 21:04:19.511+00	2019-05-11 21:06:09.096+00
31	26277250-5b4f-43f8-b7d6-0ed88c1f6657	Valance1	t	\N	182387511710973952	\N	2019-05-11 21:24:19.248+00	2019-05-11 21:24:45.293+00
32	b4433ded-78d5-4381-bc31-344f71244ec8	R00b	t	\N	157901877508440065	\N	2019-05-11 21:41:17.511+00	2019-05-11 21:41:48.465+00
33	18c9c737-779d-442b-8f1b-d07c77763b92	silveraxe	t	\N	301287775901319168	\N	2019-05-12 07:59:14.088+00	2019-05-12 08:00:01.785+00
34	7ad03fb3-b12c-41c0-b128-e6b532118d90	carln	t	\N	221704357421252608	\N	2019-05-12 09:45:02.309+00	2019-05-12 09:45:28.405+00
35	5c57b618-9d7b-4e57-8460-21ea06ce7abf	0sscr	t	\N	339103539467124736	\N	2019-05-12 11:53:38.208+00	2019-05-12 11:55:39.417+00
36	c939b9da-c018-498a-8a71-0ef47706defd	Jonse	t	\N	248566677283799050	\N	2019-05-12 15:50:42.886+00	2019-05-12 15:51:55.313+00
37	3988fbca-3284-4fa2-874d-e77f124e0cd6	Ozeroff	f	\N	\N	c68622	2019-05-12 15:52:07.841+00	\N
38	bf6d2333-0ea1-45d4-877a-b006d31e91d1	philip2096	t	\N	221648797699276800	\N	2019-05-12 17:31:05.629+00	2019-05-12 17:31:49.026+00
39	ee56c4e1-0832-48f0-8ad9-16a557f0a773	tobitelle	t	\N	224917045073018880	\N	2019-05-13 14:55:33.836+00	2019-05-13 14:57:27.222+00
42	69e26235-651c-4a5e-a14d-7711b3689b2c	hremnold	t	\N	332882152637071372	\N	2019-05-13 16:28:34.254+00	2019-05-13 16:29:56.153+00
43	779ea8bd-1a11-4e6f-93a5-2f8cc17a5b35	Elliees	t	\N	345219632010887168	\N	2019-05-13 17:56:36.479+00	2019-05-13 18:01:09.644+00
44	236f6dab-b20f-472e-85cb-e8a798204966	AlexanderWerm	t	\N	257258521966542849	\N	2019-05-14 17:21:32.541+00	2019-05-14 17:22:13.148+00
45	8d5ba094-d36a-4749-a571-701f5ca68929	Sampis	t	\N	373133955852926988	\N	2019-05-17 13:43:09.24+00	2019-05-17 13:43:36.357+00
40	1860e01e-d458-4bc5-98e2-a41bc7c099f5	bob634146	t	\N	318092232219557888	\N	2019-05-25 18:16:53.403+00	2019-05-25 18:17:42.507+00
47	a12a8719-c5d8-4ccd-98f9-99aa64a2126d	jack88oo	t	\N	296026602469457921	\N	2019-05-25 18:43:18.236+00	2019-05-25 18:44:24.681+00
53	4761a7e0-b016-4ecd-b728-e1dfe354e703	SnyggLinus	t	\N	502839288988172308	\N	2019-05-30 14:56:31.666+00	2019-05-30 14:56:59.231+00
55	02641943-e9c5-42b0-b036-f4e3dce8bf6d	Stormish	t	\N	166217117794959361	\N	2019-06-02 16:51:22.367+00	2019-06-02 16:58:43.189+00
56	5e05d09f-c7f8-463f-9662-3acc4017245f	Lilahamstern	t	\N	148518921635364864	\N	2019-06-07 18:12:04.542+00	2019-06-07 18:12:22.087+00
57	cdd30e2c-781f-4978-84a1-808f8732a2f5	Shadow_Disciple	t	\N	479049228996444190	\N	2019-06-15 22:27:08.266+00	2019-06-15 22:27:55.258+00
58	db6a7352-5f35-4a37-9959-88546e6b4344	CyanCanOpener	t	\N	290865751047405578	\N	2019-06-15 22:27:16.777+00	2019-06-15 22:28:34.998+00
59	4b92351b-480c-4ad4-976c-b3d8741a4d3e	CaptainElsa	t	\N	335601544378449921	\N	2019-06-15 22:29:16.902+00	2019-06-15 22:30:55.472+00
60	7729409b-ce58-4786-bc89-d8738bd80d68	MajaWild	t	\N	313717699756818444	\N	2019-06-15 22:29:39.945+00	2019-06-15 22:31:46.039+00
61	f0f1179e-9f43-4af1-be41-c41c1cdba5a1	daniel123erik	f	\N	\N	9d50e0	2019-06-16 17:44:45.243+00	\N
62	8cadd5fe-79cf-4570-b524-4f69aa5a48e9	xMichzz_swe	t	\N	495322014735663135	\N	2019-07-15 12:21:11.189+00	2019-07-15 12:27:55.747+00
63	9129f6d0-55d4-42bf-aacd-8a14f4b8f1d5	Tugga_Extra	f	\N	\N	1c3ddb	2019-07-17 09:02:53.937+00	\N
67	56c93ed5-347c-4195-9c47-859c75286be1	Mathiasnordstrom	t	\N	282840965453185035	\N	2019-08-12 15:41:40.052+00	2019-08-12 15:42:20.848+00
68	cebb2644-c0d7-45ab-898f-bb4813cee783	Tuqz	f	\N	\N	d32b70	2019-08-12 17:03:35.021+00	\N
102	5e3d62fb-7a87-49fc-932e-68b1e9474762	RedWarriors	f	\N	\N	bc8cbb	2019-08-15 21:18:04.029+00	\N
103	c044b10d-c67a-451c-9798-e0f28ff3bc80	Stensaxpannk	f	\N	\N	0c38bf	2019-08-16 22:23:29.336+00	\N
65	694f6e58-c7aa-422e-af7f-86d50000d39b	IsacAnder	t	\N	316185442519089152	\N	2019-08-19 18:17:39.927+00	2019-08-19 18:19:00.103+00
107	a7253b72-8383-4081-8637-28fc332c5127	Hamalainen	t	\N	221794430607163392	\N	2019-08-19 18:28:04.723+00	2019-08-19 18:29:34.932+00
108	1dcdd87f-0316-4327-96dd-c41f09c5860c	BlondeBuzzard36	t	\N	484365332115619840	\N	2019-08-20 15:04:30.29+00	2019-08-20 15:05:41.82+00
64	0e2a4f6f-9577-4146-b078-78b3c9c09092	Leadingflyer	t	\N	445171812536418305	\N	2019-08-20 15:06:11.176+00	2019-08-20 15:07:43.649+00
110	b6f6b811-6eff-4133-85ae-ec0f45b77c27	slickepott_	f	\N	\N	cdde95	2019-08-24 11:34:13.569+00	\N
111	183a8822-348d-4614-a193-f6b3c937b456	mojjen72	t	\N	446545739229822976	\N	2019-08-26 15:50:34.392+00	2019-08-26 15:51:36.806+00
113	838d30dc-9af0-4f9c-ba90-0fc09cfa41a4	thickheaded	t	\N	226752420942708737	\N	2019-09-04 17:20:18.346+00	2019-09-04 17:23:09.302+00
114	69bcf2a3-dcdd-4f93-ad41-1fb962c23b7e	Little16	t	\N	397763246922399744	\N	2019-09-06 18:06:29.407+00	2019-09-06 18:08:31.926+00
115	a9cbd349-6f14-4241-abba-8fc766982234	opaso	t	\N	619273958524452885	\N	2019-09-08 21:36:31.909+00	2019-09-08 21:37:18.939+00
116	90455815-b3bd-473b-824a-ebcfc7a9ac37	Sixtano	t	\N	306114903368925206	\N	2019-09-09 17:08:19.76+00	2019-09-09 17:13:50.606+00
117	fa73b4e0-a192-49a7-869c-da51a5f944c2	fille449	f	\N	\N	294355	2019-09-10 18:48:06.675+00	\N
104	6b304e43-f183-423f-af17-4802a07f0eb4	Pownie	t	\N	319808270485159948	\N	2019-09-12 19:12:49.838+00	2019-09-12 19:13:14.043+00
124	915ca2c8-2571-4b8d-a104-254a102f21bc	69_JOERGEN_69	f	\N	\N	631300	2019-09-14 11:02:33.445+00	\N
106	11f1edbb-c091-4d27-9e57-841ccc2c28e9	MirreQueen	t	\N	622519880645607446	\N	2019-09-14 19:54:48.388+00	2019-09-14 19:58:33.806+00
122	e2acf09e-a368-485d-a076-d5e1fee74a7b	XMiloprobattleX	t	\N	311144639824658433	\N	2019-09-16 17:08:09.373+00	2019-09-16 17:12:08.725+00
129	91e27d47-b31c-4814-8b33-7cf4b7c97741	Luciiidor	t	\N	285113407609241601	\N	2019-09-19 21:46:53.881+00	2019-09-19 21:48:27.884+00
130	4c1cb6f0-4127-4fbd-bdc3-147564787bfb	sirNubbe	t	\N	424944784029777921	\N	2019-09-21 15:14:59.111+00	2019-09-21 15:17:10.602+00
131	7ef80592-ecc8-4d33-8cd8-3e82ccc89400	amnadagirl	t	\N	430694274783510529	\N	2019-09-28 07:15:12.099+00	2019-09-28 07:15:53.337+00
133	c411eac4-e256-48f3-9af1-e2dde6081913	aomoa	f	\N	\N	7478fd	2019-09-28 20:29:58.095+00	\N
134	5955ab1b-f3fc-45c4-b748-d37a9939a7d6	spif49	t	\N	188617064527822849	\N	2019-10-01 21:10:14.805+00	2019-10-01 21:10:52.431+00
135	e26d15d1-95c4-4de5-b3fc-559279bf4171	Gravkulle	t	\N	202074061784743936	\N	2019-10-02 11:12:17.916+00	2019-10-02 11:12:57.291+00
137	9524adfb-8640-4fa2-9933-3f05129e3b91	swedawn	t	\N	343840872799928321	\N	2019-10-15 13:22:27.338+00	2019-10-15 13:23:09.369+00
138	6051c1cf-db2e-41c4-b379-a73399120dab	StrangerDanger98	f	\N	\N	e6bb3d	2019-10-23 15:04:13.998+00	\N
136	e30bb16b-9616-4360-b158-ee26930f27fe	JockePro	f	\N	\N	c703db	2019-10-24 16:00:22.788+00	\N
172	6070f61e-6b2b-4fcf-8d58-f1ca266336b3	jonteking66	t	\N	424683570439913474	\N	2019-10-25 18:58:46.338+00	2019-10-25 19:00:34.911+00
175	c3165082-ac4f-445a-88cc-81587330f06a	MaeTae	t	\N	320977767833403402	\N	2019-10-27 18:00:28.892+00	2019-10-27 18:01:18.951+00
173	32aeea17-5e43-46ee-9eb7-f4c2ed54173e	Knuuu	t	\N	636245790783963148	\N	2019-10-28 12:28:42.189+00	2019-10-28 12:29:22.869+00
174	6a8ea795-b90d-44c9-bb66-fce8b819d971	unkkk	t	\N	124987298520498177	\N	2019-10-28 12:28:34.332+00	2019-10-28 12:29:47.946+00
186	2ce45001-2a63-4d6f-92ab-edf1c873bd63	robajo	t	\N	231051083433246730	\N	2019-11-02 14:32:55.449+00	2019-11-02 14:33:15.155+00
185	c303e641-d6da-4a19-8b97-9915eab2f203	limpan06	t	\N	605720612807114764	\N	2019-11-02 16:21:59.703+00	2019-11-02 16:25:47.559+00
179	0df1710a-3a36-41b2-bbf0-7e4b4afba303	Krille_	t	\N	423752104080048141	\N	2019-11-06 09:36:53.617+00	2019-11-06 09:37:13.826+00
191	34c2d8ad-ed46-49a2-9e91-dc3b5b2b93af	ForceThunder	t	\N	268002713533415424	\N	2019-11-10 20:02:32.16+00	2019-11-10 20:03:49.945+00
192	9ce5d70c-5824-4299-b95b-7ddcf3dbf7b9	Yffla	t	\N	423102371199975434	\N	2019-11-11 19:50:08.731+00	2019-11-11 19:51:08.068+00
194	051dae46-66d2-43f8-b740-2d4864eec1e3	badgerattack	t	\N	214082007582375938	\N	2019-11-13 04:02:17.888+00	2019-11-13 04:02:44.038+00
195	9bfacf46-5c53-4081-bda5-a6310f9fb2ca	Olisch	f	\N	\N	f0ab80	2019-11-16 20:02:14.283+00	\N
196	21f1f94b-9a77-4f97-8da7-aed4c5c54133	Nordesh	f	\N	\N	f71d0f	2019-11-22 18:08:06.381+00	\N
` /* eslint-enable no-useless-escape */
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [
      ,
      minecraft_uuid,
      name,
      verified,
      ,
      discordUserId,
      verifyToken,
      verifyTokenCreated,
      verifyDate
    ] = line.split("\t");
    return {
      discordUserId: discordUserId === "N" ? null : discordUserId,
      minecraft_uuid,
      name,
      verified: verified === "t",
      verifyDate: verifyDate === "N" ? null : new Date(verifyDate),
      verifyToken: verifyToken === "N" ? null : verifyToken,
      verifyTokenCreated: new Date(verifyTokenCreated)
    };
  })
  .reduce((acc, user) => {
    acc[user.minecraft_uuid] = user;
    return acc;
  }, {});

// eslint-disable-next-line no-unused-vars
export default function makeMigrate({ db, addUser, addHome, addBan }) {
  return async function({ yaml: yml }) {
    if (!yml) {
      throw new Error("You must supply a yaml object.");
    }

    const ymlDoc = yaml.load(yml).users;
    const users = Object.entries(ymlDoc).map(([key, value]) => ({
      discord_user_id: verifyData[key] ? verifyData[key].discordUserId : null,
      is_verified: verifyData[key] ? verifyData[key].verified : false,
      minecraft_uuid: key,
      name: value.lastSeenAs,
      verify_date: verifyData[key] ? verifyData[key].verifyDate : null,
      verify_token: verifyData[key] ? verifyData[key].verifyToken : null,
      verify_token_created: verifyData[key]
        ? verifyData[key].verifyTokenCreated
        : new Date()
    }));

    const addedUsers = {};
    const tasks = [];

    for (const userData of users) {
      tasks.push(
        addUser(userData).then((user) => {
          addedUsers[user.minecraft_uuid] = user;
        })
      );
    }

    await Promise.all(tasks);

    const bans = Object.entries(ymlDoc)
      .filter(([, value]) => value.isBanned)
      .map(([key, value]) => ({
        cancelled_by: null,
        cancelled_date: null,
        expiry_date: value.banExpiration ? new Date(value.banExpiration) : null,
        is_cancelled: false,
        issued_by: null,
        issued_date: new Date(),
        reason: value.banReason,
        user_id: addedUsers[key].id
      }));

    for (const banData of bans) {
      addBan(banData);
    }

    const homes = Object.entries(ymlDoc)
      .filter(([, value]) => value.homes)
      .flatMap(([key, value]) =>
        Object.entries(value.homes).map(([name, home]) => ({
          allow_commands: home.allowsCmds,
          is_open: home.isPublic,
          name,
          pitch: home.pitch,
          user_id: addedUsers[key].id,
          world: home.world,
          x: home.x,
          y: home.y,
          yaw: home.yaw,
          z: home.z
        }))
      );

    for (const homeData of homes) {
      addHome(homeData);
    }
  };
}
