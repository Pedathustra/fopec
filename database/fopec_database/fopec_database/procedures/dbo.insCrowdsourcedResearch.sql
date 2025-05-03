use fopec
go

if exists(select * from sys.procedures where name = 'insCrowdsourcedResearch')
begin 
	drop proc insCrowdsourcedResearch;
end 
go

create proc insCrowdsourcedResearch 
		@company_id int
	,	@ownership_type_id int
	,	@observing_person_id int = null 
	,	@notes varchar(max)
	,	@parent_company_id int = null
as
begin
	set nocount on;

	insert into crowdsourced_research(
			company_id
		,	ownership_type_id
		,	observing_person_id
		,	created
		,	notes
		,	parent_company_id
	)
	values(
			@company_id
		,	@ownership_type_id
		,	@observing_person_id
		,	getdate()
		,	@notes
		,	@parent_company_id
	)
end 
go 

-- exec insCrowdsourcedResearch;
/*
select * from ownership_type
select * from crowdsourced_research
select * from company
*/