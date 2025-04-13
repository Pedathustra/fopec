delete from crowdsourced_research;
delete from company_location;
delete from company;
delete from person;
delete from business_focus;
delete from address;
delete from ownership_type;

------------------------
-- address
------------------------
insert into address(line1, line2, city, state, zip)
values('600 Canyon Blvd', null, 'Westminster', 'CO', '80021'), 
('400 Redbury Lane' , null, 'Tempe', 'AZ', '665544'),
('321 Broadway Blvd', null, 'New York City', 'NY', '665544');

------------------------
-- business_focus
------------------------
insert into business_focus(description) 
values ('Vet Clinic'), ('Orthopedic Clinic'), ('Doggie Daycare');

------------------------
-- person
------------------------
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Robert', '', 'DeNiro', 'taximan', 0x01, getdate());

declare @robert_id int = (select id from person where username = 'taximan');

insert into person (first_name, middle_name, last_name, username, password, created)
values ('Syd', '', 'Barrett', 'thegnome', 0x01, getDate());
declare @syd_person_id int = (select id from person where username = 'thegnome');

insert into person (first_name, middle_name, last_name, username, password, created)
values ('Sid', '', 'Vicious', 'savethequeen', 0x01, getDate());
declare @vicious_person_id int = (select id from person where username = 'savethequeen');

------------------------
-- company
------------------------
insert into company(name, created, last_updated, person_id_created) 
values ('Evil Corp', getdate(), getdate(), @robert_id);
declare @evil_corp_company_id int = (select id from company where name ='Evil Corp');

insert into company(name, created, last_updated, person_id_created) 
values ('ABC Animal Hospital', getdate(), getdate(), @robert_id);
declare @abc_animal_hospital_company_id int = (select id from company where name ='ABC Animal Hospital');

------------------------
-- company_location
------------------------
declare @evil_corp_address_id int = (select id from address where line1 = '321 Broadway Blvd');
declare @abc_address_id int = (select id from address where line1 = '600 Canyon Blvd');

insert into company_location(company_id, address_id, isHQ) 
values (@evil_corp_company_id, @evil_corp_address_id, 1),
       (@abc_animal_hospital_company_id, @abc_address_id, 0);

------------------------
-- ownership_type
------------------------
insert into ownership_type (description) 
values ('Sole Proprietorship'), ('Corporation'), ('Shell Corporation'), ('Private Equity');

declare @sp_ownership_type_id int = (select id from ownership_type where description = 'Sole Proprietorship');
declare @corp_ownership_type_id int = (select id from ownership_type where description = 'Corporation');
declare @shell_ownership_type_id int = (select id from ownership_type where description = 'Shell Corporation');
declare @private_equity_type_id int = (select id from ownership_type where description = 'Private Equity');

------------------------
-- crowdsourced_research
------------------------
insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@evil_corp_company_id, @sp_ownership_type_id, @robert_id, null, getdate(), 'I looked into public records and found this...');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@abc_animal_hospital_company_id, @sp_ownership_type_id, @robert_id, @evil_corp_company_id, getdate(), 'Subsidiary of Evil Corp');

------------------------
-- more test data with person/company
------------------------

-- Person 1: Ada Lovelace
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Ada', '', 'Lovelace', 'analyticalengine', 0x01, getdate());
declare @ada_id int = (select id from person where username = 'analyticalengine');

insert into company(name, created, last_updated, person_id_created) 
values ('Lovelace Biotech Holdings', getdate(), getdate(), @ada_id);
declare @lovelace_id int = (select id from company where name = 'Lovelace Biotech Holdings');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@lovelace_id, @corp_ownership_type_id, @ada_id, null, getdate(), 'Registered as a corporation but has ties to a larger PE firm.');

-- Person 2: Alan Turing
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Alan', '', 'Turing', 'enigma', 0x01, getdate());
declare @alan_id int = (select id from person where username = 'enigma');

insert into company(name, created, last_updated, person_id_created) 
values ('Turing Ventures', getdate(), getdate(), @alan_id);
declare @turing_id int = (select id from company where name = 'Turing Ventures');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@turing_id, @private_equity_type_id, @alan_id, null, getdate(), 'Likely private equity backed — no public financials found.');

-- Person 3: Grace Hopper
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Grace', '', 'Hopper', 'bugfinder', 0x01, getdate());
declare @grace_id int = (select id from person where username = 'bugfinder');

insert into company(name, created, last_updated, person_id_created) 
values ('Hopper Diagnostics', getdate(), getdate(), @grace_id);
declare @hopper_id int = (select id from company where name = 'Hopper Diagnostics');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@hopper_id, @shell_ownership_type_id, @grace_id, null, getdate(), 'Multiple addresses found but no operating info — likely a shell.');

-- Person 4: Linus Torvalds
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Linus', '', 'Torvalds', 'penguinpower', 0x01, getdate());
declare @linus_id int = (select id from person where username = 'penguinpower');

insert into company(name, created, last_updated, person_id_created) 
values ('Torvalds Health Partners', getdate(), getdate(), @linus_id);
declare @torvalds_id int = (select id from company where name = 'Torvalds Health Partners');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@torvalds_id, @sp_ownership_type_id, @linus_id, null, getdate(), 'Operates independently. No evidence of outside ownership.');

-- Person 5: Margaret Hamilton
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Margaret', '', 'Hamilton', 'apollocoder', 0x01, getdate());
declare @margaret_id int = (select id from person where username = 'apollocoder');

insert into company(name, created, last_updated, person_id_created) 
values ('Hamilton Medical Group', getdate(), getdate(), @margaret_id);
declare @hamilton_id int = (select id from company where name = 'Hamilton Medical Group');

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, parent_company_id, created, notes)
values (@hamilton_id, @corp_ownership_type_id, @margaret_id, null, getdate(), 'Found on a corporation registry, but parent ownership unclear.');



/*

select	c.name
	,	ot.description
	,	p.username
	,	cr.created
	,	cr.notes	
	,	cr.id parent_company_id
	,	cr.name parent_company_name

from crowdsourced_research cr 
	join company c on cr.company_id = c.id
	left join company pc on cr.parent_company_id = pc.parent_company_id
	join ownership_type ot on cr.ownership_type_id = ot.id
	join person p on cr.observing_person_id = p.id

*/