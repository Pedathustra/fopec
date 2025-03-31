use fopec
go

if exists(select * from sys.procedures where name = 'insCrowdsourcedResearch')
begin 
	drop proc insCrowdsourcedResearch;
end 
go

create proc insCrowdsourcedResearch 
		@companyId int
	,	@ownership_type_id int
	,	@observing_person_id int = null 
	,	@notes varchar(max)
as
begin
	set nocount on;
	-- hardcode this for now until there's a login
	if @observing_person_id is null set @observing_person_id = (select top 1 id from person);

	insert into crowdsourced_research(
			company_id
		,	ownership_type_id
		,	observing_person_id
		,	created
		,	notes
	)
	values(
			@companyId
		,	@ownership_type_id
		,	@observing_person_id
		,	getdate()
		,	@notes
	)
end 
go 

-- exec insCrowdsourcedResearch;
/*
select * from ownership_type
select * from crowdsourced_research
select * from company
*/