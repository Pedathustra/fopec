delete from company_location;
delete from company;
delete from person;
delete from business_focus;
delete from address;

delete from crowdsourced_research;
delete from ownership_type;

------------------------
-- address
------------------------
insert into address(line1, line2, city, state, zip)
values('600 Canyon Blvd', null, 'Westminster', 'CO', '80021'), 
('400 Redbury Lane' , null, 'Tempe', 'AZ', '665544'),
('321 Broadway Blvd', null, 'New York City', 'NY', '665544')

------------------------
-- business_focus
------------------------
insert into business_focus(description) values('Vet Clinic'), ('Orthopedic Clinic'), ('Doggie Daycare')

------------------------
-- person
------------------------
insert into person (first_name, middle_name, last_name, username, password, created)
values ('Robert', '', 'DeNiro', 'taximan', 0x01, getdate())

declare @robert_id int = (select id from person where username = 'taximan');

insert into person (first_name, middle_name, last_name, username, password, created)
values ('Syd', '', 'Barrett', 'thegnome', 0x01, getDate())
declare @syd_person_id int = (select id from person where username = 'thegnome');



insert into person (first_name, middle_name, last_name, username, password, created)
values ('Sid', '', 'Vicious', 'savethequeen', 0x01, getDate());
declare @vicious_person_id int = (select id from person where username = 'savethequeen');

------------------------
-- company
------------------------

insert into company(name, created, last_updated, person_id_created, parent_company_id) 
values ('Evil Corp', getdate(), getdate(), @robert_id,  null)

 declare @evil_corp_company_id int = (select id from company where name ='Evil Corp');
insert into company(name, created, last_updated, person_id_created, parent_company_id) 
values ('ABC Animal Hospital', getdate(), getdate(), @robert_id, @evil_corp_company_id);

------------------------
-- company_location
------------------------
declare @abc_animal_hospital_company_id int = (select id from company where name ='ABC Animal Hospital');
declare @evil_corp_address_id int = (select id from address where line1 = '321 Broadway Blvd');
declare @abc_address_id int = (select id from address where line1 = '600 Canyon Blvd');


insert into company_location(company_id, address_id, isHQ) 
	values (@evil_corp_company_id, @evil_corp_address_id, 1)
	,		(@abc_animal_hospital_company_id, @abc_address_id, 0)

------------------------
-- ownership_type
------------------------
insert into ownership_type (description) values ('Sole Proprietorship'), ('Corporation'), ('Shell Corporation'), ('Private Equity')
declare @sp_ownership_type_id int = ( select id from ownership_type where description = 'Sole Proprietorship')
declare @corp_ownership_type_id int = ( select id from ownership_type where description = 'Sole Proprietorship')
declare @shell_ownership_type_id int = ( select id from ownership_type where description = 'Sole Proprietorship')
declare @private_equity_type_id int = ( select id from ownership_type where description = 'Sole Proprietorship')

insert into crowdsourced_research(company_id, ownership_type_id, observing_person_id, created, notes)
values (@evil_corp_company_id, @sp_ownership_type_id, @robert_id, getdate(), 'I looked into public records and found this...')


select	c.name
	,	ot.description
	,	p.username
	,	cr.created
	,	cr.notes	
from crowdsourced_research cr 
	join company c on cr.company_id = c.id
	join ownership_type ot on cr.ownership_type_id = ot.id
	join person p on cr.observing_person_id = p.id