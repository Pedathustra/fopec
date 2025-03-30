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
	,	@observing_person_id int
	,	@notes varchar(max)
as
begin
	set nocount on;
	select id, description from ownership_type;
end 
go 

-- exec insCrowdsourcedResearch;

--select * from crowdsourced_research