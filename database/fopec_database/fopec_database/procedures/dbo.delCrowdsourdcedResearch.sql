use fopec
go

if exists(select * from sys.procedures where name = 'delCrowdsourcedResearch')
begin 
	drop proc delCrowdsourcedResearch;
end 
go

create proc delCrowdsourcedResearch 
		@crowdsourced_research_id int
as
begin
	set nocount on;
	delete from crowdsourced_research where id = @crowdsourced_research_id;
end 
go 
