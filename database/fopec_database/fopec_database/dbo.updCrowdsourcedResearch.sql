use fopec
go

if exists(select * from sys.procedures where name = 'updCrowdsourcedResearch')
begin 
	drop proc updCrowdsourcedResearch;
end 
go

create proc updCrowdsourcedResearch 
		@crowdsourced_research_id int
	,	@ownership_type_id int
	,	@notes varchar(max)
as
begin
	set nocount on;
	update crowdsourced_research
	set ownership_type_id = @ownership_type_id
	,	notes = @notes 
	where id = @crowdsourced_research_id
end 
go 
