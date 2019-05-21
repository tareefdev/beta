---
parent: collections
title: Chemical Weapons Database
date: 2018-04-24T00:05:18.055Z
desc: Summary of findings, about, and methods
image: /assets/chemical/chemicalheader.jpg
level: 1
---

import ChAbout from './aboutSA.md';
import ChAcknowledgements from './acknowledgements.md';
import ChErrors from './errors.md';
import ChIntro from './intro.md';
import ChMethodology from './methodology.md';
import ChShortsaabout from './shortSAabout.md';
import ChSubmit from './submit.md';
import ChThedata from './thedata.md';
import ChThedata2 from './thedata2.md';
import ChUseofchemicalweapons1 from './useofchemicalweapons1.md';
import ChUseofchemicalweapons2 from './useofchemicalweapons2.md';
import ChUsingthedatabase from './usingthedatabase.md';
import ChViolationslist from './violationslist.md';

import Timeline from '../../../src/components/timeline.js';
import BlockViz from '../../../src/components/blockviz.js';
import RemovedVideos from '../../../src/components/removedvideos.js';

## Chemical Weapons Database
<ChIntro />
<ChShortsaabout />

## These videos include
<ChViolationslist />

###### Number of Videos
<BlockViz 
	width={700}
	numbers={[862]}
	colors={["teal"]}
/>

###### Sources of data
<BlockViz 
	width={700}
	numbers={[193]}
	colors={["red"]}
/>

###### Chemical weapon attacks
<BlockViz 
	width={700}
	numbers={[162,50]}
	colors={["SkyBlue","orange"]}
/>

## The use of chemical weapons in Syria
<ChUseofchemicalweapons1 />
<ChUseofchemicalweapons2 />

<Timeline 
	width={700}
	height={200}
	collectionName = {"Chemical weapons"}
	lang={"en"}
/>



## The Data
<ChThedata />

###### Videos Removed From Youtube
<small> as of 20.4.2018 </small>
<RemovedVideos 
	width={800}
/>

<ChThedata2 />

## Using the Database
<ChUsingthedatabase />

## Methodology
<ChMethodology />

## About Syrian Archive
<ChAbouten />

## Video submission
<ChSubmit />

## Errors, corrections and feedback
<ChErrors />

## Acknowledgements
<ChAcknowledgements />
